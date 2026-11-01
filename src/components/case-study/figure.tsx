import Image from "next/image";
import { getImageSize } from "@/lib/image-size";

type Props = {
  src: string;
  alt: string;
  // Optional; a leading **bold sentence** is rendered as a lead-in
  caption?: string;
  // Short label above the image, e.g. one side of a comparison
  label?: string;
  // Larger or different image for the lightbox; the thumbnail stays `src`
  fullSrc?: string;
  // Visible line under the thumbnail, e.g. "Click to view the full diagram"
  hint?: string;
  sizes?: string;
  enlargeLabel: string;
};

function Caption({ text }: { text: string }) {
  const match = text.match(/^\*\*(.+?)\*\*\s*(.*)$/);
  if (!match) return <>{text}</>;
  return (
    <>
      <strong className="font-bold">{match[1]}</strong> {match[2]}
    </>
  );
}

// The button is picked up by the section's Lightbox (event delegation, no client JS here)
export default function Figure({ src, alt, caption, label, fullSrc, hint, sizes = "100vw", enlargeLabel }: Props) {
  if (!alt?.trim()) {
    throw new Error(`Figure ${src}: alt text is required (decorative images aren't allowed in case studies)`);
  }
  const { width, height } = getImageSize(src);
  const full = fullSrc ? { src: fullSrc, ...getImageSize(fullSrc) } : null;

  return (
    <figure className="w-full">
      {label && (
        <figcaption className="mb-4 text-body font-semibold text-[var(--color-fg)]">{label}</figcaption>
      )}
      <button
        type="button"
        data-lightbox=""
        data-src={full?.src ?? src}
        data-alt={alt}
        data-caption={caption}
        data-width={full?.width ?? width}
        data-height={full?.height ?? height}
        data-full={full ? "" : undefined}
        aria-label={`${enlargeLabel}: ${alt}`}
        className="block w-full cursor-zoom-in rounded-md"
      >
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className="h-auto w-full rounded-md" />
      </button>
      {hint && <p className="mt-2 text-body-sm text-[var(--color-fg-tertiary)]">{hint}</p>}
      {caption && !label && (
        <figcaption className="mt-3.5 text-body-sm text-[var(--color-fg-secondary)]">
          <Caption text={caption} />
        </figcaption>
      )}
    </figure>
  );
}
