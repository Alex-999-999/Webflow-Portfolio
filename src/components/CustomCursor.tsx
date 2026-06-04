import { useEffect, useState } from "react";

const DOT_SIZE = 16;

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const activate = () => {
      const isEnabled = media.matches;
      setEnabled(isEnabled);
      document.documentElement.classList.toggle("custom-cursor-active", isEnabled);
    };

    activate();
    media.addEventListener("change", activate);

    if (!media.matches) {
      return () => {
        media.removeEventListener("change", activate);
        document.documentElement.classList.remove("custom-cursor-active");
      };
    }

    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      media.removeEventListener("change", activate);
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  if (!enabled || !visible) return null;

  const offset = DOT_SIZE / 2;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[10000] rounded-full bg-white"
      style={{
        left: position.x - offset,
        top: position.y - offset,
        width: DOT_SIZE,
        height: DOT_SIZE,
        mixBlendMode: "difference",
      }}
    />
  );
}
