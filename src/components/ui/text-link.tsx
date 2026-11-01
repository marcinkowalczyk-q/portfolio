import Link from "next/link";
import type { ReactNode } from "react";
import Icon, { type IconName } from "./icon";

type Props = {
  href: string;
  external?: boolean;
  // Visually hidden suffix for external links, e.g. "opens in a new tab"
  newTabLabel?: string;
  icon?: IconName;
  className?: string;
  children: ReactNode;
};

export default function TextLink({
  href,
  external = false,
  newTabLabel = "opens in a new tab",
  icon,
  className = "",
  children,
}: Props) {
  const cls = `inline-flex items-center gap-1.5 underline decoration-1 underline-offset-[3px] transition-colors hover:text-[var(--color-fg)] ${className}`;
  const leading = icon && <Icon name={icon} size={14} className="shrink-0" />;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {leading}
        <span>{children}</span>
        <Icon name="external" size={12} className="shrink-0" />
        <span className="sr-only"> ({newTabLabel})</span>
      </a>
    );
  }

  // mailto: and other non-route links don't go through the router
  if (!href.startsWith("/")) {
    return (
      <a href={href} className={cls}>
        {leading}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {leading}
      <span>{children}</span>
    </Link>
  );
}
