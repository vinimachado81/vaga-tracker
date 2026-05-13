
import { useBoard } from './hooks/useBoard';
import { Header } from './components/Board/Header';
import { Board } from './components/Board/Board';
import { EmptyState } from './components/Board/EmptyState';
import { Modal } from './components/Card/Modal';
import { Notification } from './components/UI';

export default function App() {
  const {
    cards, filteredCards, cardsByColumn,
    modal, search, setSearch, notif, stats,
    saveCard, deleteCard, moveCard, reorderCards,
    openCreate, openEdit, closeModal,
  } = useBoard();

  const isEmpty = cards.length === 0 && !search;

  return (
    <div className="min-h-screen bg-bg">
      <Header
        search={search}
        onSearchChange={setSearch}
        onAddCard={() => openCreate('wishlist')}
        stats={stats}
      />
      <main className="px-6 pt-6 overflow-x-auto">
        {isEmpty ? (
          <EmptyState onAdd={openCreate} />
        ) : (
          <Board
            allCards={filteredCards}
            cardsByColumn={cardsByColumn}
            onAddCard={openCreate}
            onEditCard={openEdit}
            onDeleteCard={deleteCard}
            onMoveCard={moveCard}
            onReorder={reorderCards}
          />
        )}
      </main>
      {modal && (
        <Modal modal={modal} onSave={saveCard} onDelete={deleteCard} onClose={closeModal} />
      )}
      {notif && <Notification message={notif} />}
    </div>
  );
}
