type WorkPreviewImageProps = {
  src: string;
  alt: string;
  aspectRatio: string;
  className?: string;
};

/** Resolves Vite asset imports (?url string or { default: string }) for use in img src. */
export function resolveWorkPreviewSrc(src: unknown): string {
  if (typeof src === "string" && src.length > 0) return src;
  if (src && typeof src === "object" && "default" in src) {
    const value = (src as { default: unknown }).default;
    if (typeof value === "string" && value.length > 0) return value;
  }
  return "";
}

export function WorkPreviewImage({
  src,
  alt,
  aspectRatio,
  className = "w-full object-cover object-top",
}: WorkPreviewImageProps) {
  const resolved = resolveWorkPreviewSrc(src);

  if (!resolved) {
    return (
      <div
        className="w-full bg-gradient-to-br from-white/10 to-white/[0.02]"
        style={{ aspectRatio }}
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <img
      src={resolved}
      alt={alt}
      draggable={false}
      className={className}
      style={{ aspectRatio }}
    />
  );
}
