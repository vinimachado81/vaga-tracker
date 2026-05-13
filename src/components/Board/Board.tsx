import { useState } from 'react';
import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverlay,
} from '@dnd-kit/core';
import type { JobCard, ColumnId } from '../../types';
import { COLUMNS } from '../../utils/constants';
import { BoardColumn } from './Column';
import { JobCardEl } from '../Card/JobCard';

interface Props {
  cardsByColumn: (colId: ColumnId) => JobCard[];
  allCards: JobCard[];
  onAddCard: (colId: ColumnId) => void;
  onEditCard: (card: JobCard) => void;
  onDeleteCard: (id: string) => void;
  onMoveCard: (cardId: string, toColId: ColumnId) => void;
  onReorder: (activeId: string, overId: string) => void;
}

export function Board({ cardsByColumn, allCards, onAddCard, onEditCard, onDeleteCard, onMoveCard, onReorder }: Props) {
  const [activeCard, setActiveCard] = useState<JobCard | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const card = allCards.find(c => c.id === event.active.id);
    if (card) setActiveCard(card);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCard(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const draggedCard = allCards.find(c => c.id === active.id);
    if (!draggedCard) return;

    const targetIsColumn = COLUMNS.some(c => c.id === over.id);
    if (targetIsColumn) {
      if (draggedCard.columnId !== over.id) onMoveCard(String(active.id), over.id as ColumnId);
      return;
    }

    const overCard = allCards.find(c => c.id === over.id);
    if (!overCard) return;

    if (draggedCard.columnId !== overCard.columnId) {
      onMoveCard(String(active.id), overCard.columnId);
    } else {
      onReorder(String(active.id), String(over.id));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 min-w-max pb-6">
        {COLUMNS.map(col => (
          <BoardColumn
            key={col.id} col={col}
            cards={cardsByColumn(col.id)}
            onAddCard={onAddCard}
            onEditCard={onEditCard}
            onDeleteCard={onDeleteCard}
          />
        ))}
      </div>
      <DragOverlay>
        {activeCard && (
          <div className="rotate-2 opacity-90 shadow-2xl">
            <JobCardEl card={activeCard} onEdit={() => {}} onDelete={() => {}} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
