import type { T } from "@/i18n";
import type { Project } from "@/lib/projects";
import ProjectCard from "./project-card";

type Props = { projects: Project[]; t: T };

export default function WorkList({ projects, t }: Props) {
  return (
    <section id="work" aria-labelledby="work-heading">
      <h2 id="work-heading" className="sr-only">
        Selected work
      </h2>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} t={t} />
      ))}
    </section>
  );
}
