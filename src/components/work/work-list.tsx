import { projects } from "@/lib/projects";
import ProjectCard from "./project-card";

export default function WorkList() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="mx-auto max-w-6xl px-6 md:px-10"
    >
      <h2 id="work-heading" className="sr-only">
        Selected work
      </h2>
      <div>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
