// ── Etapas do funil
export type ColumnId =
  | 'wishlist'
  | 'applied'
  | 'interview'
  | 'offer'
  | 'rejected';

// ── Prioridade
export type Priority = 'high' | 'medium' | 'low';

// ── Card de candidatura
export interface JobCard {
  id: string;
  columnId: ColumnId;
  company: string;
  role: string;
  salary?: string;
  url?: string;
  notes?: string;
  appliedAt?: string;
  createdAt: string;
  tags: string[];
  priority: Priority;
}

// ── Definição de coluna
export interface Column {
  id: ColumnId;
  label: string;
  color: string;
  glowClass: string;
  emoji: string;
}

// ── Estado do modal
export type ModalState =
  | { type: 'create'; columnId: ColumnId }
  | { type: 'edit'; card: JobCard }
  | null;
