const BODY_FONT = "'Inter', system-ui, sans-serif";

function TechPills({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`.trim()}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/85 sm:px-3 sm:py-1.5 sm:text-[13px]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function WorkTechStack({
  coreStack,
  infraStack,
  highlights,
}: {
  coreStack: readonly string[];
  infraStack: readonly string[];
  highlights: readonly string[];
}) {
  return (
    <section
      className="mt-10 max-w-3xl border border-white/15 p-6 sm:p-8"
      style={{ fontFamily: BODY_FONT }}
    >
      <h2 className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/45">
        Build scope
      </h2>

      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/55">
            Design & build
          </p>
          <TechPills items={coreStack} className="mt-3" />
        </div>
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/55">
            CMS & integrations
          </p>
          <TechPills items={infraStack} className="mt-3" />
        </div>
      </div>

      {highlights.length > 0 ? (
        <div className="mt-8 border-t border-white/15 pt-8">
          <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/55">
            Build highlights
          </p>
          <ul className="mt-4 space-y-2.5 text-[14px] leading-relaxed text-white/70">
            {highlights.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/50" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

export function WorkCardTechStack({
  coreStack,
  infraStack,
}: {
  coreStack: readonly string[];
  infraStack: readonly string[];
}) {
  const stack = [...coreStack, ...infraStack];

  return (
    <div className="mt-4 border-t border-white/10 pt-4">
      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
        Build scope
      </p>
      <TechPills items={stack} className="mt-2.5" />
    </div>
  );
}
