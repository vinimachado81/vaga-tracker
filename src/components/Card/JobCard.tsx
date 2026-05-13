
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Pencil, Trash2, ExternalLink } from 'lucide-react';
import type { JobCard } from '../../types';
import { TagBadge } from '../UI';
import { timeAgo } from '../../utils/helpers';

interface Props {
  card: JobCard;
  onEdit: (card: JobCard) => void;
  onDelete: (id: string) => void;
}

export function JobCardEl({ card, onEdit, onDelete }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id, data: { card } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        group relative bg-s2 border border-bdr rounded-[10px] p-3 cursor-grab active:cursor-grabbing
        transition-all duration-150 select-none
        priority-${card.priority}
        hover:border-bdr2 hover:bg-s3 hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(0,0,0,0.35)]
        ${isDragging ? 'opacity-40 rotate-2 scale-105' : ''}
      `}
    >
      {/* Company + link */}
      <div className="flex items-start justify-between gap-2 mb-0.5">
        <span className="text-[13px] font-semibold leading-snug">{card.company}</span>
        {card.url && (
          <a
            href={card.url}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()}
            className="text-txt3 hover:text-blue transition-colors flex-shrink-0 mt-0.5"
          >
            <ExternalLink size={11} />
          </a>
        )}
      </div>

      {/* Role */}
      <p className="text-[12px] text-txt2 mb-2 leading-snug">{card.role}</p>

      {/* Salary */}
      {card.salary && (
        <p className="text-[11px] font-mono text-green mb-2">{card.salary}</p>
      )}

      {/* Tags */}
      {card.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {card.tags.map(tag => (
            <TagBadge key={tag} label={tag} />
          ))}
        </div>
      )}

      {/* Notes preview */}
      {card.notes && (
        <p className="text-[11px] text-txt3 mb-2 line-clamp-2 leading-relaxed">
          {card.notes}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-1">
        <span className="text-[10px] font-mono text-txt3">
          {timeAgo(card.appliedAt || card.createdAt)}
        </span>

        {/* Action buttons — visíveis no hover */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onPointerDown={e => e.stopPropagation()}
            onClick={e => { e.stopPropagation(); onEdit(card); }}
            className="flex items-center justify-center w-[26px] h-[26px] rounded-[6px]
                       bg-surface border border-bdr text-txt2
                       hover:text-txt hover:border-bdr2 transition-all"
            title="Editar"
          >
            <Pencil size={11} />
          </button>
          <button
            onPointerDown={e => e.stopPropagation()}
            onClick={e => { e.stopPropagation(); onDelete(card.id); }}
            className="flex items-center justify-center w-[26px] h-[26px] rounded-[6px]
                       bg-surface border border-bdr text-txt2
                       hover:text-red hover:border-red/50 transition-all"
            title="Excluir"
          >
            <Trash2 size={11} />
          </button>
        </div>
      </div>
    </div>
  );
}
