import { Link } from "@tanstack/react-router";

const BODY_FONT = "'Inter', system-ui, sans-serif";

const linkClassName =
  "inline-flex items-center gap-1.5 border-b border-white pb-1 text-[15px] font-medium text-white transition-opacity hover:opacity-80";

type CheckOutMyWorkLinkProps = {
  href?: string;
  label?: string;
  to?: "/work" | "/";
  className?: string;
};

export function CheckOutMyWorkLink({
  href,
  label,
  to = "/work",
  className = "",
}: CheckOutMyWorkLinkProps) {
  const classNames = `${linkClassName} ${className}`.trim();
  const externalLabel = label ?? "View live site";
  const isMailto = href?.startsWith("mailto:");

  if (href) {
    return (
      <a
        href={href}
        {...(isMailto
          ? {}
          : { target: "_blank", rel: "noopener noreferrer" })}
        className={classNames}
        style={{ fontFamily: BODY_FONT }}
      >
        <span>{externalLabel}</span>
        {!isMailto ? <span aria-hidden>↗</span> : null}
      </a>
    );
  }

  return (
    <Link
      to={to}
      className={classNames}
      style={{ fontFamily: BODY_FONT }}
    >
      <span>Check out my work</span>
      <span aria-hidden>↗</span>
    </Link>
  );
}
