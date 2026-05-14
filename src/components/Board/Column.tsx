
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import type { Column, JobCard } from '../../types';
import { JobCardEl } from '../Card/JobCard';

interface Props {
  col: Column;
  cards: JobCard[];
  onAddCard: (colId: Column['id']) => void;
  onEditCard: (card: JobCard) => void;
  onDeleteCard: (id: string) => void;
}

export function BoardColumn({ col, cards, onAddCard, onEditCard, onDeleteCard }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: col.id });

  return (
    <div className="flex flex-col w-[280px] flex-shrink-0 bg-surface border border-bdr rounded-xl max-h-[calc(100vh-88px)]">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-bdr flex-shrink-0">
        <span
          className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${col.glowClass}`}
          style={{ background: col.color }}
        />
        <span className="text-[13px] font-semibold flex-1">{col.label}</span>
        <span className="font-mono text-[11px] text-txt2 bg-s2 border border-bdr px-2 py-0.5 rounded-full">
          {cards.length}
        </span>
        <button
          onClick={() => onAddCard(col.id)}
          className="w-6 h-6 flex items-center justify-center rounded-md text-txt3
                     hover:bg-s2 hover:text-txt transition-all"
          title="Adicionar vaga"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Cards area */}
      <div
        ref={setNodeRef}
        className={`flex flex-col gap-2 p-2.5 overflow-y-auto flex-1 transition-colors ${isOver ? 'drag-over' : ''}`}
      >
        <SortableContext items={cards.map(c => c.id)} strategy={verticalListSortingStrategy}>
          {cards.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <span
                 className="w-8 h-8 rounded-full mb-3 opacity-20"
                 style={{ background: col.color }}
              />
              <p className="text-[12px] text-txt3 leading-relaxed">
                Arraste cards aqui<br />ou clique no +
              </p>
            </div>
          ) : (
            cards.map(card => (
              <JobCardEl
                key={card.id}
                card={card}
                onEdit={onEditCard}
                onDelete={onDeleteCard}
              />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
}
