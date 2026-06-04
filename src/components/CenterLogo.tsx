/**
 * Center wordmark — bold block logotype, ~12% smaller than prior revision.
 */
const LETTERS: Array<{
  ch: string;
  rot: number;
  scaleX: number;
  scaleY: number;
  dy: number;
  dx: number;
}> = [
  { ch: "P", rot: -6, scaleX: 1.08, scaleY: 1.1, dy: 2, dx: -2 },
  { ch: "A", rot: 4, scaleX: 1.02, scaleY: 1.05, dy: -2, dx: 0 },
  { ch: "N", rot: -3, scaleX: 0.98, scaleY: 1.02, dy: 1, dx: 0 },
  { ch: "O", rot: 5, scaleX: 0.88, scaleY: 0.92, dy: 3, dx: 1 },
  { ch: "R", rot: -4, scaleX: 1.0, scaleY: 1.04, dy: -1, dx: 0 },
  { ch: "A", rot: 3, scaleX: 1.06, scaleY: 1.08, dy: 2, dx: -1 },
  { ch: "M", rot: -5, scaleX: 1.1, scaleY: 1.12, dy: -2, dx: 0 },
  { ch: "A", rot: 6, scaleX: 1.14, scaleY: 1.15, dy: 0, dx: 2 },
];

export function CenterLogo() {
  return (
    <div className="flex select-none flex-col items-center">
      <div
        className="flex items-end justify-center"
        style={{
          fontFamily: "'Anton', sans-serif",
          color: "#ffffff",
          lineHeight: 0.78,
          filter: "drop-shadow(0 8px 40px rgba(0,0,0,0.7))",
        }}
      >
        {LETTERS.map((l, i) => (
          <span
            key={i}
            className="inline-block text-[17vw] sm:text-[13vw] md:text-[10.5vw] lg:text-[8.5vw]"
            style={{
              transform: `translate(${l.dx}px, ${l.dy}px) rotate(${l.rot}deg) scale(${l.scaleX}, ${l.scaleY})`,
              marginInline: l.ch === "O" ? "-0.08em" : "-0.05em",
            }}
          >
            {l.ch}
          </span>
        ))}
      </div>
      <span
        className="mt-2 text-[3vw] sm:text-[1.75vw] md:text-[1.25vw] lg:text-[0.95vw]"
        style={{
          fontFamily: "'Oswald', sans-serif",
          fontWeight: 700,
          letterSpacing: "0.65em",
          textIndent: "0.65em",
          color: "rgba(255,255,255,0.95)",
        }}
      >
        FILMS
      </span>
    </div>
  );
}
