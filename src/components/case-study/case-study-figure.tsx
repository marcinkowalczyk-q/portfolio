import Image from "next/image";
import type { CaseStudyImage } from "@/lib/case-studies";

type Props = { image: CaseStudyImage };

export default function CaseStudyFigure({ image }: Props) {
  return (
    <figure className="overflow-hidden rounded-md bg-[var(--color-surface-2)]">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="h-auto w-full object-cover"
        sizes="(min-width: 768px) 800px, 100vw"
      />
    </figure>
  );
}
