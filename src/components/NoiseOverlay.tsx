export function NoiseOverlay() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-30"
        aria-hidden="true"
        style={{
          opacity: 0.34,
          mixBlendMode: "overlay",
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='280' height='280'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
          backgroundSize: "280px 280px",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-30"
        aria-hidden="true"
        style={{
          opacity: 0.18,
          mixBlendMode: "screen",
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='f'><feTurbulence type='turbulence' baseFrequency='1.2' numOctaves='2'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0'/></filter><rect width='100%25' height='100%25' filter='url(%23f)'/></svg>")`,
          backgroundSize: "120px 120px",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-30"
        aria-hidden="true"
        style={{
          opacity: 0.08,
          mixBlendMode: "soft-light",
          backgroundImage:
            "repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0px, transparent 1px, transparent 2px)",
          backgroundSize: "2px 2px",
        }}
      />
    </>
  );
}
