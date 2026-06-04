import { useEffect } from "react";
import { X } from "lucide-react";

import { resolveWorkPreviewSrc } from "@/components/WorkPreviewImage";

type ProjectPreviewLightboxProps = {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
};

export function ProjectPreviewLightbox({
  open,
  onClose,
  src,
  alt,
}: ProjectPreviewLightboxProps) {
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const resolvedSrc = resolveWorkPreviewSrc(src);
  if (!open || !resolvedSrc) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black p-6 pt-16 sm:p-10 sm:pt-20"
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} fullscreen preview`}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center text-white transition-opacity hover:opacity-70 sm:right-8 sm:top-8"
        aria-label="Close preview"
      >
        <X className="h-8 w-8" strokeWidth={1.25} />
      </button>

      <img
        src={resolvedSrc}
        alt={alt}
        draggable={false}
        className="max-h-full max-w-full object-contain"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}
