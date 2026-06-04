const BODY_FONT = "'Inter', system-ui, sans-serif";

export function WorkProblemsSolved({ items }: { items: readonly string[] }) {
  if (items.length === 0) return null;

  return (
    <section
      className="mt-10 max-w-3xl border border-white/15 p-6 sm:p-8"
      style={{ fontFamily: BODY_FONT }}
    >
      <h2 className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/45">
        What I delivered
      </h2>
      <ul className="mt-6 space-y-4 text-[14px] leading-relaxed text-white/70">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/50" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
