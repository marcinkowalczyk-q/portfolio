import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export const buttonClass =
  "inline-flex items-center gap-1 rounded-[6px] border border-[var(--color-control-border)] bg-[var(--color-bg)] px-[18px] py-[10px] text-sm leading-[normal] font-medium text-[var(--color-fg)] transition-opacity hover:opacity-70";

// A trailing arrow in the label is decorative; hide it from screen readers
function Label({ children }: { children: ReactNode }) {
  if (typeof children === "string" && /\s[→↗]$/.test(children)) {
    return (
      <>
        {children.slice(0, -2)}
        <span aria-hidden="true">&nbsp;{children.slice(-1)}</span>
      </>
    );
  }
  return <>{children}</>;
}

type LinkButtonProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export default function LinkButton({ href, className = "", children }: LinkButtonProps) {
  return (
    <Link href={href} className={`${buttonClass} ${className}`}>
      <Label>{children}</Label>
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
