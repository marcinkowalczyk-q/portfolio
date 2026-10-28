import type { ReactNode } from "react";
import type { T } from "@/i18n";
import Lightbox from "./lightbox";

type Props = { heading: string; id: string; t: T; children: ReactNode };

// H2 block: text in the 740px column, figures widen to 790 / 980px.
// The section is the lightbox gallery: ←/→ stay within its images.
export default function CaseStudySection({ heading, id, t, children }: Props) {
  return (
    <section aria-labelledby={id} className="px-6 md:px-10">
      <Lightbox
        labels={{ close: t["lightbox.close"], prev: t["lightbox.prev"], next: t["lightbox.next"] }}
        className="flex flex-col items-center"
      >
        {/* 4px + the first paragraph's 12px top margin = 16px heading → body */}
        <h2 id={id} className="mb-1 w-full max-w-text text-h2-sm text-[var(--color-fg-primary)] md:text-h2">
          {heading}
        </h2>
        {children}
      </Lightbox>
    </section>
  );
}
