import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

type Props = { project: Project };

export default function ProjectCard({ project }: Props) {
  return (
    <article
      aria-labelledby={`project-${project.id}-title`}
      className="grid gap-8 border-t border-[var(--color-border)] py-16 md:grid-cols-12 md:gap-12 md:py-24"
    >
      <header className="md:col-span-5">
        <p className="text-sm font-medium tracking-[0.2em] text-[var(--color-fg-muted)]">
          {project.number} / {project.category.toUpperCase()}
        </p>
        <h2
          id={`project-${project.id}-title`}
          className="mt-4 text-3xl tracking-tight text-[var(--color-fg)] md:text-4xl"
        >
          {project.title}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
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
              className="inline-flex items-center gap-2 border-b border-[var(--color-fg)] pb-1 text-sm font-medium text-[var(--color-fg)] transition-opacity hover:opacity-70"
            >
              {project.primaryLink.label}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
          {project.secondaryLinks?.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} (opens in a new tab)`}
              className="inline-flex items-center gap-2 border-b border-[var(--color-fg-muted)] pb-1 text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)] hover:border-[var(--color-fg)]"
            >
              {link.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </header>

      <div className="md:col-span-7">
        {project.primaryLink ? (
          <Link
            href={project.primaryLink.href}
            aria-label={`Open ${project.title} case study`}
            className="block overflow-hidden rounded-md bg-[var(--color-surface-2)]"
          >
            <ProjectImage project={project} />
          </Link>
        ) : (
          <div className="overflow-hidden rounded-md bg-[var(--color-surface-2)]">
            <ProjectImage project={project} />
          </div>
        )}
      </div>
    </article>
  );
}

function ProjectImage({ project }: Props) {
  return (
    <Image
      src={project.image.src}
      alt={project.image.alt}
      width={project.image.width}
      height={project.image.height}
      className="h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
      sizes="(min-width: 768px) 60vw, 100vw"
      priority={project.number === "01"}
    />
  );
}
