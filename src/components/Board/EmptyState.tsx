
import type { ColumnId } from '../../types';

interface Props {
  onAdd: (colId: ColumnId) => void;
}

export function EmptyState({ onAdd }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-center px-6">
      <div className="text-6xl mb-5 select-none">🗂️</div>
      <h2 className="font-serif text-3xl mb-2">Comece a rastrear suas vagas</h2>
      <p className="text-txt2 text-[15px] mb-8 max-w-[380px] leading-relaxed">
        Adicione sua primeira candidatura e visualize todo o processo seletivo em um só lugar.
      </p>
      <button
        onClick={() => onAdd('wishlist')}
        className="btn-primary text-base px-6 h-11"
      >
        + Adicionar primeira vaga
      </button>
      <p className="text-txt3 text-[12px] mt-6">
        Seus dados ficam salvos no seu navegador — sem criar conta.
      </p>
    </div>
  );
}
