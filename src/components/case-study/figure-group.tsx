import { Children, type ReactNode } from "react";

type Props = {
  variant?: "single" | "pair" | "row";
  children: ReactNode;
};

// single: 790px · pair: 2 × 474px in 980px · row: 500px image + 344px text in 980px.
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

  return <div className="mt-8 w-full max-w-figure">{children}</div>;
}
