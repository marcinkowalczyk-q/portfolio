const WIDTHS = {
  hero: "w-[178px] md:w-[268px]",
  section: "w-full max-w-text",
  full: "w-full",
} as const;

type Props = { width?: keyof typeof WIDTHS; className?: string };

// Decorative: sections are already separated by headings
export default function Divider({ width = "full", className = "" }: Props) {
  return (
    <hr
      aria-hidden="true"
      className={`h-px border-0 bg-[var(--color-divider)] ${WIDTHS[width]} ${className}`}
    />
  );
}
