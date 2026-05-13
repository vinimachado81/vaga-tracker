import type { JobCard } from '../types';

const STORAGE_KEY = 'vaga-tracker-v1';

// ── Persistência
export function loadCards(): JobCard[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as JobCard[]) : [];
  } catch {
    return [];
  }
}

export function saveCards(cards: JobCard[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch {
    console.warn('Falha ao salvar no localStorage');
  }
}

// ── ID único
export function genId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

// ── Formatar data relativa em português
export function timeAgo(isoStr?: string): string {
  if (!isoStr) return '';
  const diff = Date.now() - new Date(isoStr).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (mins < 1)    return 'agora mesmo';
  if (hours < 1)   return `há ${mins}min`;
  if (hours < 24)  return `há ${hours}h`;
  if (days === 1)  return 'ontem';
  if (days < 7)    return `há ${days} dias`;
  if (weeks < 5)   return `há ${weeks} sem`;
  return `há ${months} mes${months > 1 ? 'es' : ''}`;
}

// ── Formatar data para input[type=date]
export function isoToDateInput(isoStr?: string): string {
  if (!isoStr) return '';
  return isoStr.slice(0, 10);
}

export function dateInputToIso(dateStr: string): string {
  if (!dateStr) return '';
  return new Date(dateStr + 'T12:00:00').toISOString();
}
