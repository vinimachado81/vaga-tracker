import type { Column, ColumnId, JobCard } from '../types';

export const COLUMNS: Column[] = [
  { id: 'wishlist',  label: 'Quero Aplicar', color: '#4a9eff', glowClass: 'glow-blue',   emoji: '🔖' },
  { id: 'applied',   label: 'Aplicado',       color: '#f5c842', glowClass: 'glow-yellow', emoji: '📤' },
  { id: 'interview', label: 'Em Processo',    color: '#a855f7', glowClass: 'glow-purple', emoji: '🔄' },
  { id: 'offer',     label: 'Oferta',         color: '#22c55e', glowClass: 'glow-green',  emoji: '🎉' },
  { id: 'rejected',  label: 'Encerrado',      color: '#ef4444', glowClass: 'glow-red',    emoji: '✕'  },
];

export const TAG_PRESETS = [
  'Remoto', 'Híbrido', 'Presencial', 'CLT', 'PJ', 'Estágio', 'Júnior', 'Pleno',
];

export const EMPTY_FORM: Omit<JobCard, 'id' | 'createdAt'> = {
  columnId: 'wishlist',
  company: '',
  role: '',
  salary: '',
  url: '',
  notes: '',
  appliedAt: '',
  tags: [],
  priority: 'medium',
};

export const COLUMN_ORDER: ColumnId[] = [
  'wishlist', 'applied', 'interview', 'offer', 'rejected',
];
