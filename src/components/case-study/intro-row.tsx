import type { ReactNode } from "react";

type Props = { label: string; children: ReactNode };

// Context / Challenge / Constraints: 160px label + 48px gap + 752px text. Stacks on mobile.
export default function IntroRow({ label, children }: Props) {
  return (
    <section className="flex flex-col gap-3 lg:flex-row lg:justify-center lg:gap-12">
      <h2 className="text-label-lg text-[var(--color-fg-primary)] lg:w-[160px] lg:shrink-0">{label}</h2>
      <div className="lg:w-[752px]">{children}</div>
    </section>
  );
}

export function IntroRowList({ children }: { children: ReactNode }) {
  return <div className="mx-auto box-content flex max-w-page flex-col gap-10 px-6 md:px-10">{children}</div>;
}
