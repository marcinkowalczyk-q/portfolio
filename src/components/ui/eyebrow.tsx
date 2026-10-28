import type { ReactNode } from "react";

type Props = {
  number?: string;
  // The hero eyebrow is set in normal case in Figma
  uppercase?: boolean;
  className?: string;
  children: ReactNode;
};

// Stored in normal case, uppercased in CSS so screen readers don't spell it out
export default function Eyebrow({ number, uppercase = true, className = "", children }: Props) {
  return (
    <p
      className={`text-eyebrow leading-[normal] text-[var(--color-fg-secondary)] ${uppercase ? "uppercase" : ""} ${className}`}
    >
      {number && (
        <>
          <span className="text-[20px] font-bold">{number}</span> /{" "}
        </>
      )}
      {children}
    </p>
  );
}
