
import { Search, Plus } from 'lucide-react';
import { HeaderStat } from '../UI';

interface Props {
  search: string;
  onSearchChange: (val: string) => void;
  onAddCard: () => void;
  stats: {
    active: number;
    inProcess: number;
    responseRate: number;
  };
}

export function Header({ search, onSearchChange, onAddCard, stats }: Props) {
  return (
    <header className="sticky top-0 z-40 bg-bg/85 backdrop-blur-xl border-b border-bdr">
      <div className="flex items-center gap-4 px-6 h-[60px] max-w-[1800px] mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-blue shadow-[0_0_8px_#4a9eff]" />
          <span className="font-serif text-[20px] tracking-tight">Vaga Tracker</span>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-surface border border-bdr rounded-lg px-3 h-9 max-w-[300px] w-full">
          <Search size={13} className="text-txt3 flex-shrink-0" />
          <input
            className="bg-transparent outline-none text-[13px] text-txt placeholder:text-txt3 w-full font-sans"
            placeholder="Buscar empresa ou cargo..."
            value={search}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>

        {/* Stats */}
        <div className="hidden sm:flex items-center gap-6 ml-auto">
          <HeaderStat value={stats.active}       label="Ativas"     color="#4a9eff" />
          <HeaderStat value={stats.inProcess}    label="Processo"   color="#a855f7" />
          <HeaderStat value={`${stats.responseRate}%`} label="Resposta" color="#22c55e" />
        </div>

        {/* Add button */}
        <button
          onClick={onAddCard}
          className="btn-primary flex-shrink-0 ml-auto sm:ml-0"
        >
          <Plus size={14} />
          <span className="hidden sm:inline">Nova vaga</span>
          <span className="sm:hidden">+</span>
        </button>
      </div>
    </header>
  );
}
