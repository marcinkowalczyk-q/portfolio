import Image from "next/image";
import { getImageSize } from "@/lib/image-size";

type Props = {
  src: string;
  alt: string;
  // Optional; a leading **bold sentence** is rendered as a lead-in
  caption?: string;
  sizes?: string;
  enlargeLabel: string;
};

function Caption({ text }: { text: string }) {
  const match = text.match(/^\*\*(.+?)\*\*\s*(.*)$/);
  if (!match) return <>{text}</>;
  return (
    <>
      <strong className="font-semibold text-[var(--color-fg-primary)]">{match[1]}</strong> {match[2]}
    </>
  );
}

// The button is picked up by the section's Lightbox (event delegation, no client JS here)
export default function Figure({ src, alt, caption, sizes = "100vw", enlargeLabel }: Props) {
  if (!alt?.trim()) {
    throw new Error(`Figure ${src}: alt text is required (decorative images aren't allowed in case studies)`);
  }
  const { width, height } = getImageSize(src);

  return (
    <figure className="w-full">
      <button
        type="button"
        data-lightbox=""
        data-src={src}
        data-alt={alt}
        data-caption={caption}
        data-width={width}
        data-height={height}
        aria-label={`${enlargeLabel}: ${alt}`}
        className="block w-full cursor-zoom-in rounded-md"
      >
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className="h-auto w-full rounded-md" />
      </button>
      {caption && (
        <figcaption className="mt-3 text-body-sm text-[var(--color-fg-tertiary)]">
          <Caption text={caption} />
        </figcaption>
      )}
    </figure>
  );
}
