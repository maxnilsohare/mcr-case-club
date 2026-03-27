export function StatCard({
  value,
  label,
  hint
}: {
  value: string;
  label: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-ink-200 bg-white px-5 py-5 transition-colors hover:border-ink-300">
      <div className="flex items-baseline justify-between gap-4">
        <div className="heading text-3xl font-semibold leading-none">{value}</div>
        <div className="hidden h-px flex-1 bg-ink-200/70 sm:block" />
      </div>
      <div className="mt-2 text-xs font-medium tracking-[0.14em] uppercase text-ink-700">
        {label}
      </div>
      {hint ? <div className="mt-2 text-sm text-ink-700">{hint}</div> : null}
    </div>
  );
}

