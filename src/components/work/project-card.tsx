import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import type { T } from "@/i18n";

type Props = { project: Project; t: T };

export default function ProjectCard({ project, t }: Props) {
  const ctaClass =
    "inline-flex items-center rounded-[6px] border border-[var(--color-control-border)] bg-[var(--color-bg)] px-[18px] py-[10px] text-sm leading-[normal] font-medium text-[var(--color-fg)] transition-opacity hover:opacity-70";

  const textCol = (
    <div className="w-full lg:w-[460px] lg:shrink-0">
      <p className="text-[12px] leading-[normal] tracking-[2.4px] text-[var(--color-fg-secondary)] uppercase">
        <span className="text-[20px] font-bold">{project.number}</span> / {project.category}
      </p>
      <h2
        id={`project-${project.id}-title`}
        className="mt-2 text-h1-sm text-[var(--color-fg)] md:text-h1"
      >
        {project.title}
      </h2>
      <p className="mt-5 text-body text-[var(--color-fg-secondary)]">
        {project.description}
      </p>

      {project.status && (
        <p className="mt-6 text-sm font-medium text-[var(--color-fg)]">
          {project.status}
        </p>
      )}
      {project.statusNote && (
        <p className="mt-2 text-sm text-[var(--color-fg-secondary)]">
          {project.statusNote}
        </p>
      )}

      <div className="mt-8 flex flex-wrap gap-4">
        {project.primaryLink && (
          <Link
            href={project.primaryLink.href}
            className={ctaClass}
          >
            {project.primaryLink.label}
          </Link>
        )}
        {project.secondaryLinks?.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.label} (opens in a new tab)`}
            className={ctaClass}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );

  const imageContent = project.primaryLink ? (
    <Link
      href={project.primaryLink.href}
      aria-label={`Open ${project.title} case study`}
      className="block"
    >
      <Image
        src={project.image.src}
        alt={project.image.alt}
        width={project.image.width}
        height={project.image.height}
        className="h-auto w-full rounded-[6px] object-contain transition-transform duration-500 hover:scale-[1.02]"
        sizes="(min-width: 1024px) 672px, 100vw"
        priority={project.number === "01"}
      />
    </Link>
  ) : (
    <Image
      src={project.image.src}
      alt={project.image.alt}
      width={project.image.width}
      height={project.image.height}
      className="h-auto w-full rounded-[6px] object-contain"
      sizes="(min-width: 1024px) 672px, 100vw"
    />
  );

  // Mobile: text above image. Desktop: 460px text + 672px image, sides alternate.
  return (
    <article
      aria-labelledby={`project-${project.id}-title`}
      className={[
        "px-6 py-24 md:px-10",
        project.featured ? "bg-[var(--color-surface)]" : "",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-12 lg:flex-row">
        {textCol}
        <div
          className={[
            "w-full lg:w-[672px] lg:shrink",
            project.imageFirst ? "lg:order-first" : "",
          ].join(" ")}
        >
          {imageContent}
        </div>
      </div>
    </article>
  );
}
