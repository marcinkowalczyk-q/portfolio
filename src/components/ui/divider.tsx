const WIDTHS = {
  hero: "w-[178px] md:w-[268px]",
  // Case study: 232px on mobile; 478px under the meta card, 740px between topic groups
  meta: "w-[232px] md:w-[478px]",
  section: "w-[232px] md:w-full md:max-w-text",
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
