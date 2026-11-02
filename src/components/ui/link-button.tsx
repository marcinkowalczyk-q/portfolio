import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export const buttonClass =
  "inline-flex items-center gap-1 rounded-[6px] border border-[var(--color-control-border)] bg-[var(--color-bg)] px-[18px] py-[10px] text-sm leading-[normal] font-medium text-[var(--color-fg)] transition-opacity hover:opacity-70";

// A trailing arrow in the label is decorative; hide it from screen readers.
// srSuffix extends the accessible name only, e.g. "View case study: e-Delivery".
function Label({ children, srSuffix }: { children: ReactNode; srSuffix?: string }) {
  const suffix = srSuffix && <span className="sr-only">: {srSuffix}</span>;
  if (typeof children === "string" && /\s[→↗]$/.test(children)) {
    return (
      <>
        {children.slice(0, -2)}
        {suffix}
        <span aria-hidden="true">&nbsp;{children.slice(-1)}</span>
      </>
    );
  }
  return (
    <>
      {children}
      {suffix}
    </>
  );
}

type LinkButtonProps = {
  href: string;
  // Screen reader only, appended after the visible label
  srSuffix?: string;
  className?: string;
  children: ReactNode;
};

export default function LinkButton({ href, srSuffix, className = "", children }: LinkButtonProps) {
  return (
    <Link href={href} className={`${buttonClass} ${className}`}>
      <Label srSuffix={srSuffix}>{children}</Label>
    </Link>
  );
}

export function Button({
  className = "",
  type = "button",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={`${buttonClass} ${className}`} {...rest}>
      <Label>{children}</Label>
    </button>
  );
}
