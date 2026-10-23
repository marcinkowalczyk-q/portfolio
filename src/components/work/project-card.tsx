import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import type { T } from "@/i18n";

type Props = { project: Project; t: T };

export default function ProjectCard({ project, t }: Props) {
  const textCol = (
    <div className="md:w-[460px] md:shrink-0">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
        {project.number} / {project.category.toUpperCase()}
      </p>
      <h2
        id={`project-${project.id}-title`}
        className="mt-2 text-[32px] leading-[1.2] tracking-tight text-[var(--color-fg)] md:text-[40px] md:leading-[48px]"
      >
        {project.title}
      </h2>
      <p className="mt-5 text-base leading-relaxed text-[var(--color-fg-muted)]">
        {project.description}
      </p>

      {project.status && (
        <p className="mt-6 text-sm font-medium text-[var(--color-fg)]">
          {project.status}
        </p>
      )}
      {project.statusNote && (
        <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
          {project.statusNote}
        </p>
      )}

      <div className="mt-8 flex flex-wrap gap-4">
        {project.primaryLink && (
          <Link
            href={project.primaryLink.href}
            className="inline-flex items-center rounded-[6px] border border-[var(--color-fg-subtle)] px-[18px] py-[10px] text-sm font-medium text-[var(--color-fg)] transition-opacity hover:opacity-70"
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
            className="inline-flex items-center rounded-[6px] border border-[var(--color-fg-subtle)] px-[18px] py-[10px] text-sm font-medium text-[var(--color-fg)] transition-opacity hover:opacity-70"
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
        className="h-auto w-full object-contain transition-transform duration-500 hover:scale-[1.02]"
        sizes={project.featured ? "889px" : "(min-width: 768px) 55vw, 100vw"}
        priority={project.number === "01"}
      />
    </Link>
  ) : (
    <Image
      src={project.image.src}
      alt={project.image.alt}
      width={project.image.width}
      height={project.image.height}
      className="h-auto w-full object-contain"
      sizes="(min-width: 768px) 55vw, 100vw"
    />
  );

  if (project.featured) {
    return (
      <article
        aria-labelledby={`project-${project.id}-title`}
        className="w-full bg-[var(--color-bg-featured)] py-24"
      >
        <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-6 md:flex-row md:items-center md:gap-12 md:px-0">
          {textCol}
          <div className="md:flex-1">{imageContent}</div>
        </div>
      </article>
    );
  }

  return (
    <article
      aria-labelledby={`project-${project.id}-title`}
      className="py-24"
    >
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-6 md:flex-row md:items-center md:gap-12 md:px-0">
        {project.imageFirst ? (
          <>
            <div className="md:flex-1">{imageContent}</div>
            {textCol}
          </>
        ) : (
          <>
            {textCol}
            <div className="md:flex-1">{imageContent}</div>
          </>
        )}
      </div>
    </article>
  );
}
