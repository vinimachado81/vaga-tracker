import { useState, useEffect, useCallback } from 'react';
import type { JobCard, ColumnId, ModalState } from '../types';
import { loadCards, saveCards, genId } from '../utils/helpers';

export function useBoard() {
  const [cards, setCards]   = useState<JobCard[]>(loadCards);
  const [modal, setModal]   = useState<ModalState>(null);
  const [search, setSearch] = useState('');
  const [notif,  setNotif]  = useState<string | null>(null);

  // Auto-save
  useEffect(() => { saveCards(cards); }, [cards]);

  // Notificação temporária
  const showNotif = useCallback((msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 2600);
  }, []);

  // Criar ou editar card
  const saveCard = useCallback((card: JobCard) => {
    setCards(prev => {
      const exists = prev.find(c => c.id === card.id);
      return exists
        ? prev.map(c => c.id === card.id ? card : c)
        : [...prev, card];
    });
    setModal(null);
    showNotif(card.createdAt === card.id ? '✓ Candidatura criada' : '✓ Candidatura salva');
  }, [showNotif]);

  // Deletar card
  const deleteCard = useCallback((id: string) => {
    setCards(prev => prev.filter(c => c.id !== id));
    setModal(null);
    showNotif('Candidatura removida');
  }, [showNotif]);

  // Mover card entre colunas (drag and drop)
  const moveCard = useCallback((cardId: string, toColumnId: ColumnId) => {
    setCards(prev =>
      prev.map(c => c.id === cardId ? { ...c, columnId: toColumnId } : c)
    );
  }, []);

  // Reordenar cards dentro da mesma coluna
  const reorderCards = useCallback((activeId: string, overId: string) => {
    setCards(prev => {
      const oldIndex = prev.findIndex(c => c.id === activeId);
      const newIndex = prev.findIndex(c => c.id === overId);
      if (oldIndex === -1 || newIndex === -1) return prev;
      const next = [...prev];
      const [moved] = next.splice(oldIndex, 1);
      next.splice(newIndex, 0, moved);
      return next;
    });
  }, []);

  // Cards filtrados por busca
  const filteredCards = cards.filter(c => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.company.toLowerCase().includes(q) ||
      c.role.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  // Cards por coluna
  const cardsByColumn = (colId: ColumnId) =>
    filteredCards.filter(c => c.columnId === colId);

  // Estatísticas do header
  const stats = {
    total:     cards.length,
    active:    cards.filter(c => c.columnId !== 'rejected').length,
    inProcess: cards.filter(c => c.columnId === 'interview').length,
    applied:   cards.filter(c => ['applied', 'interview', 'offer'].includes(c.columnId)).length,
    get responseRate() {
      return this.applied > 0
        ? Math.round((this.inProcess / this.applied) * 100)
        : 0;
    },
  };

  // Abrir modal de criação
  const openCreate = (columnId: ColumnId) =>
    setModal({ type: 'create', columnId });

  // Abrir modal de edição
  const openEdit = (card: JobCard) =>
    setModal({ type: 'edit', card });

  const closeModal = () => setModal(null);

  return {
    cards,
    filteredCards,
    cardsByColumn,
    modal,
    search,
    setSearch,
    notif,
    stats,
    saveCard,
    deleteCard,
    moveCard,
    reorderCards,
    openCreate,
    openEdit,
    closeModal,
    genId,
  };
}
