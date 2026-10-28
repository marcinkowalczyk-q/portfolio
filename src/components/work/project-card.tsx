import Image from "next/image";
import Link from "next/link";
import type { CaseStudyCard } from "@/lib/content";
import Eyebrow from "@/components/ui/eyebrow";
import LinkButton from "@/components/ui/link-button";

type Props = {
  card: CaseStudyCard;
  href: string;
  number: string;
  ctaLabel: string;
  featured?: boolean;
  imageFirst?: boolean;
};

export default function ProjectCard({ card, href, number, ctaLabel, featured, imageFirst }: Props) {
  const titleId = `project-${card.slug}-title`;

  // Mobile: text above image. Desktop: 460px text + 672px image, sides alternate.
  return (
    <article
      aria-labelledby={titleId}
      className={["px-6 py-24 md:px-10", featured ? "bg-[var(--color-surface)]" : ""].join(" ")}
    >
      <div className="mx-auto flex max-w-cards flex-col items-center gap-12 lg:flex-row">
        <div className="w-full lg:w-[460px] lg:shrink-0">
          <Eyebrow number={number}>{card.category}</Eyebrow>
          <h2 id={titleId} className="mt-2 text-h1-sm text-[var(--color-fg)] md:text-h1">
            {card.title}
          </h2>
          <p className="mt-5 text-body text-[var(--color-fg-secondary)]">{card.summary}</p>
          <div className="mt-8">
            <LinkButton href={href}>{ctaLabel}</LinkButton>
          </div>
        </div>

        <div className={["w-full lg:w-[672px] lg:shrink", imageFirst ? "lg:order-first" : ""].join(" ")}>
          {/* Mouse shortcut to the case study; the CTA is the one keyboard / screen reader link */}
          <Link href={href} tabIndex={-1} aria-hidden="true" className="block">
            <Image
              src={card.image}
              alt=""
              width={672}
              height={420}
              className="h-auto w-full rounded-[6px] object-contain transition-transform duration-500 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100"
              sizes="(min-width: 1024px) 672px, 100vw"
              priority={featured}
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
