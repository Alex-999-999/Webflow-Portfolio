import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import resumePdf from "@/assets/Resume/En Zuo.pdf";

const FONT = "'Bebas Neue', sans-serif";
const FADED_COLOR = "rgba(0, 0, 0, 0.28)";
const ACTIVE_COLOR = "#000000";

interface NavItem {
  label: string;
  href: string;
  active: boolean;
  external: boolean;
}

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
}

function getItemColor(item: NavItem, hoveredLabel: string | null): string {
  if (item.active) return FADED_COLOR;
  if (hoveredLabel === item.label) return FADED_COLOR;
  return ACTIVE_COLOR;
}

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  const navItems: NavItem[] = [
    { label: "WORK", href: "/work", active: pathname === "/work" || pathname.startsWith("/work/"), external: false },
    { label: "RESUME", href: resumePdf, active: false, external: true },
    { label: "HOME", href: "/", active: pathname === "/", external: false },
  ];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setHoveredLabel(null);
  }, [open]);

  if (!open) return null;

  const linkClassName =
    "text-[clamp(3.5rem,12vw,7.5rem)] leading-[0.95] tracking-[0.02em] transition-[color,transform,opacity] duration-300 ease-out";

  return (
    <div
      className="fixed inset-0 z-[100] flex animate-in fade-in flex-col bg-white text-black duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <nav
        className="flex flex-1 flex-col items-center justify-center gap-2 px-6"
        onMouseLeave={() => setHoveredLabel(null)}
      >
        {navItems.map((item) => {
          const color = getItemColor(item, hoveredLabel);
          const isHovered = hoveredLabel === item.label;
          const style = {
            fontFamily: FONT,
            color,
            transform: isHovered && !item.active ? "scale(1.02)" : "scale(1)",
          };

          const hoverHandlers = {
            onMouseEnter: () => setHoveredLabel(item.label),
          };

          if (!item.external) {
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={onClose}
                className={linkClassName}
                style={style}
                {...hoverHandlers}
              >
                {item.label}
              </Link>
            );
          }

          return (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className={linkClassName}
              style={style}
              {...hoverHandlers}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="flex justify-center pb-12">
        <button
          type="button"
          onClick={onClose}
          className="rounded-[32px] bg-black px-10 py-2.5 text-[24px] leading-none text-white transition-all duration-300 hover:px-12 hover:py-3"
          style={{ fontFamily: FONT }}
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}
