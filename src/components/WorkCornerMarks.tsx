const CORNER =
  "pointer-events-none fixed z-20 h-7 w-7 border-white/35 sm:h-8 sm:w-8";

export function WorkCornerMarks() {
  return (
    <>
      <div aria-hidden className={`${CORNER} left-5 top-5 border-l border-t sm:left-8 sm:top-8`} />
      <div aria-hidden className={`${CORNER} right-5 top-5 border-r border-t sm:right-8 sm:top-8`} />
      <div aria-hidden className={`${CORNER} bottom-5 left-5 border-b border-l sm:bottom-8 sm:left-8`} />
      <div aria-hidden className={`${CORNER} bottom-5 right-5 border-b border-r sm:bottom-8 sm:right-8`} />
    </>
  );
}
