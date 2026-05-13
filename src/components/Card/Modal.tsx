import { useState, useRef, useEffect } from 'react';

import { X } from 'lucide-react';
import type { JobCard, ColumnId, Priority, ModalState } from '../../types';
import { COLUMNS, TAG_PRESETS, EMPTY_FORM } from '../../utils/constants';
import { genId, isoToDateInput, dateInputToIso } from '../../utils/helpers';
import { TagBadge } from '../UI';

interface Props {
  modal: ModalState;
  onSave: (card: JobCard) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export function Modal({ modal, onSave, onDelete, onClose }: Props) {
  const isEdit = modal?.type === 'edit';
  const initialCard = isEdit ? modal.card : undefined;
  const defaultColumnId = modal?.type === 'create' ? modal.columnId : 'wishlist';

  const [form, setForm] = useState<Omit<JobCard, 'id' | 'createdAt'>>(() =>
    initialCard
      ? { ...initialCard }
      : { ...EMPTY_FORM, columnId: defaultColumnId }
  );
  const [tagInput, setTagInput]     = useState('');
  const [confirmDel, setConfirmDel] = useState(false);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => { firstRef.current?.focus(); }, []);

  // Fechar com Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const set = <K extends keyof typeof form>(key: K, val: (typeof form)[K]) =>
    setForm(f => ({ ...f, [key]: val }));

  const addTag = (tag: string) => {
    const t = tag.trim();
    if (t && !form.tags.includes(t)) set('tags', [...form.tags, t]);
    setTagInput('');
  };

  const removeTag = (tag: string) =>
    set('tags', form.tags.filter(t => t !== tag));

  const handleSubmit = () => {
    if (!form.company.trim() || !form.role.trim()) return;
    const now = new Date().toISOString();
    onSave({
      ...form,
      id:        initialCard?.id ?? genId(),
      createdAt: initialCard?.createdAt ?? now,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-surface border border-bdr rounded-2xl w-full max-w-[480px] max-h-[90vh] overflow-y-auto animate-modal-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-0">
          <h2 className="font-serif text-2xl">
            {isEdit ? 'Editar candidatura' : 'Nova candidatura'}
          </h2>
          <button
            onClick={onClose}
            className="text-txt3 hover:text-txt transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-s2"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Empresa + Cargo */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] text-txt2 font-medium mb-1.5 tracking-wide">
                Empresa *
              </label>
              <input
                ref={firstRef}
                className="form-field"
                placeholder="ex: Nubank"
                value={form.company}
                onChange={e => set('company', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[12px] text-txt2 font-medium mb-1.5 tracking-wide">
                Cargo *
              </label>
              <input
                className="form-field"
                placeholder="ex: Dev Frontend Jr"
                value={form.role}
                onChange={e => set('role', e.target.value)}
              />
            </div>
          </div>

          {/* Etapa + Salário */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] text-txt2 font-medium mb-1.5 tracking-wide">
                Etapa
              </label>
              <select
                className="form-field cursor-pointer"
                value={form.columnId}
                onChange={e => set('columnId', e.target.value as ColumnId)}
              >
                {COLUMNS.map(c => (
                  <option key={c.id} value={c.id} style={{ background: '#1c1c26' }}>
                    {c.emoji} {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[12px] text-txt2 font-medium mb-1.5 tracking-wide">
                Salário esperado
              </label>
              <input
                className="form-field"
                placeholder="ex: R$ 3.000"
                value={form.salary ?? ''}
                onChange={e => set('salary', e.target.value)}
              />
            </div>
          </div>

          {/* Prioridade */}
          <div>
            <label className="block text-[12px] text-txt2 font-medium mb-1.5 tracking-wide">
              Prioridade
            </label>
            <div className="flex gap-2">
              {(['high', 'medium', 'low'] as Priority[]).map(p => {
                const selected = form.priority === p;
                const styles = {
                  high:   selected ? 'border-red text-red bg-red/10'       : 'border-bdr text-txt3',
                  medium: selected ? 'border-yellow text-yellow bg-yellow/10' : 'border-bdr text-txt3',
                  low:    selected ? 'border-bdr2 text-txt bg-s3'           : 'border-bdr text-txt3',
                };
                return (
                  <button
                    key={p}
                    onClick={() => set('priority', p)}
                    className={`flex-1 py-2 rounded-lg border text-[12px] font-medium transition-all ${styles[p]}`}
                  >
                    {p === 'high' ? '🔴 Alta' : p === 'medium' ? '🟡 Média' : '⚪ Baixa'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Link */}
          <div>
            <label className="block text-[12px] text-txt2 font-medium mb-1.5 tracking-wide">
              Link da vaga
            </label>
            <input
              className="form-field"
              placeholder="https://..."
              value={form.url ?? ''}
              onChange={e => set('url', e.target.value)}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-[12px] text-txt2 font-medium mb-1.5 tracking-wide">
              Tags
            </label>
            <input
              className="form-field"
              placeholder="Digite e pressione Enter..."
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') { e.preventDefault(); addTag(tagInput); }
              }}
            />
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {form.tags.map(tag => (
                  <TagBadge key={tag} label={tag} onRemove={() => removeTag(tag)} />
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {TAG_PRESETS.filter(t => !form.tags.includes(t)).map(t => (
                <button
                  key={t}
                  onClick={() => addTag(t)}
                  className="text-[11px] px-2.5 py-0.5 rounded-full border border-dashed border-bdr
                             text-txt3 hover:border-blue hover:text-blue hover:bg-blue/5 transition-all"
                >
                  + {t}
                </button>
              ))}
            </div>
          </div>

          {/* Data */}
          <div>
            <label className="block text-[12px] text-txt2 font-medium mb-1.5 tracking-wide">
              Data de aplicação
            </label>
            <input
              className="form-field"
              type="date"
              value={isoToDateInput(form.appliedAt)}
              onChange={e => set('appliedAt', dateInputToIso(e.target.value))}
            />
          </div>

          {/* Notas */}
          <div>
            <label className="block text-[12px] text-txt2 font-medium mb-1.5 tracking-wide">
              Notas
            </label>
            <textarea
              className="form-field resize-y min-h-[80px]"
              placeholder="Contato, próximos passos, observações..."
              value={form.notes ?? ''}
              onChange={e => set('notes', e.target.value)}
            />
          </div>

          {/* Confirm delete box */}
          {confirmDel && (
            <div className="bg-red/8 border border-red/20 rounded-lg p-3 text-[13px] text-red/80">
              <strong className="block text-red mb-1">Confirmar exclusão?</strong>
              Essa ação não pode ser desfeita.
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2 justify-end">
            {isEdit && (
              <button
                className="btn-danger mr-auto"
                onClick={() => confirmDel ? onDelete(initialCard!.id) : setConfirmDel(true)}
              >
                {confirmDel ? 'Confirmar' : 'Excluir'}
              </button>
            )}
            <button className="btn-ghost" onClick={onClose}>Cancelar</button>
            <button
              className="btn-primary"
              onClick={handleSubmit}
              disabled={!form.company.trim() || !form.role.trim()}
            >
              {isEdit ? 'Salvar' : 'Criar candidatura'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
