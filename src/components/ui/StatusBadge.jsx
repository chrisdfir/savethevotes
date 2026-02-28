export default function StatusBadge({ active, label }) {
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wide ${
      active
        ? "bg-accent/15 text-accent-light border border-accent/25"
        : "bg-surface-elevated text-text-muted border border-border"
    }`}>
      {active && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
        </span>
      )}
      {label}
    </span>
  );
}
