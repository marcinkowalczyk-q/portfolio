import { Children, type ReactNode } from "react";

type Props = {
  variant?: "single" | "pair" | "row" | "panel" | "overlay";
  children: ReactNode;
};

// single: 790px · pair: 2 × 474px in 980px (4 images wrap to a 2×2 grid)
// row: 500px image + 344px text in 980px · panel: diagram on a muted 790px panel
// overlay: desktop screenshot with a phone laid over its lower right (793 × 458 in Figma).
// Everything stacks on mobile; rows put the text first.
export default function FigureGroup({ variant = "single", children }: Props) {
  if (variant === "row") {
    const [figure, ...text] = Children.toArray(children);
    return (
      <div className="mt-14 flex w-full max-w-wide flex-col gap-8 lg:flex-row lg:items-start lg:justify-center">
        <div className="order-last lg:order-first lg:w-[500px] lg:shrink-0">{figure}</div>
        <div className="lg:w-[344px]">{text}</div>
      </div>
    );
  }

  if (variant === "pair") {
    return <div className="mt-8 grid w-full max-w-wide gap-8 md:grid-cols-2 md:items-start">{children}</div>;
  }

  if (variant === "panel") {
    return (
      <div className="mt-8 w-full max-w-figure bg-[var(--color-surface-muted)] px-8 py-[72px] md:py-24">{children}</div>
    );
  }

  if (variant === "overlay") {
    // Positions are the Figma offsets as percentages, so the composition scales as one
    const [desktop, phone] = Children.toArray(children);
    return (
      <div className="relative mt-8 aspect-[793/458] w-full max-w-figure">
        <div className="w-[81.2%]">{desktop}</div>
        <div className="absolute top-[18.5%] left-[62.3%] w-[37.7%]">{phone}</div>
      </div>
    );
  }

  return <div className="mt-8 w-full max-w-figure">{children}</div>;
}
