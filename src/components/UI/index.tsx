

// ── Badge de tag
export function TagBadge({ label, onRemove }: { label: string; onRemove?: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 bg-s3 border border-bdr rounded-full px-2.5 py-0.5 text-[11px] text-txt2 font-mono">
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="text-txt3 hover:text-red transition-colors leading-none ml-0.5"
        >
          ×
        </button>
      )}
    </span>
  );
}

// ── Badge de prioridade
export function PriorityBadge({ priority }: { priority: 'high' | 'medium' | 'low' }) {
  const map = {
    high:   { label: 'Alta',  className: 'bg-red/10 text-red border-red/20' },
    medium: { label: 'Média', className: 'bg-yellow/10 text-yellow border-yellow/20' },
    low:    { label: 'Baixa', className: 'bg-bdr text-txt3 border-bdr' },
  };
  const { label, className } = map[priority];
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-md border font-mono ${className}`}>
      {label}
    </span>
  );
}

// ── Notification toast
export function Notification({ message }: { message: string }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-notif-in flex items-center gap-2.5 bg-s2 border border-bdr rounded-lg px-4 py-3 text-sm shadow-2xl">
      <span className="w-2 h-2 rounded-full bg-green flex-shrink-0" />
      {message}
    </div>
  );
}

// ── Stat item para o header
export function HeaderStat({
  value,
  label,
  color,
}: {
  value: string | number;
  label: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="font-serif text-lg leading-none" style={{ color }}>
        {value}
      </span>
      <span className="text-[10px] text-txt2 uppercase tracking-wider">{label}</span>
    </div>
  );
}
