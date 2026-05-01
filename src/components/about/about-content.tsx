import Image from "next/image";

const PARAGRAPHS = [
  "I design user experiences for complex digital products, focusing on solving real problems for users and organizations. My work sits at the intersection of UX, product, and technology, where solutions need to be realistic, scalable, and feasible to implement.",
  "My focus is on structuring complex processes, working with data, and collaborating closely with product and development teams. I'm most effective in ambiguous environments, where direction is not obvious and solutions emerge through exploration, hypotheses, iteration, and validation.",
  "I'm particularly interested in applying artificial intelligence to product design, especially in decision support, personalization, and automation. This area is an exploratory direction and a potential R&D path.",
];

const PORTRAIT_SRC =
  "https://cdn.prod.website-files.com/697fa75c9246c7e0901d6165/698261a1a040ba7ee336e98c_some_handsome_guy_1.png";

const LINKEDIN_URL = "https://www.linkedin.com/in/marcin-kowalczyk-85569714a/";

export default function AboutContent() {
  return (
    <section
      aria-labelledby="about-heading"
      className="mx-auto max-w-6xl px-6 py-20 md:grid md:grid-cols-12 md:gap-16 md:px-10 md:py-28"
    >
      <div className="md:col-span-4">
        <div className="overflow-hidden rounded-md bg-[var(--color-surface-2)]">
          <Image
            src={PORTRAIT_SRC}
            alt="Portrait photo of Marcin Kowalczyk"
            width={800}
            height={1000}
            className="h-auto w-full object-cover"
            sizes="(min-width: 768px) 33vw, 100vw"
            priority
          />
        </div>
      </div>

      <div className="mt-10 md:col-span-8 md:mt-0">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
          About
        </p>
        <h1
          id="about-heading"
          className="mt-6 text-4xl tracking-tight text-[var(--color-fg)] md:text-5xl"
        >
          Designing complex systems, end&#8209;to&#8209;end.
        </h1>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
          {PARAGRAPHS.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-10">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Marcin Kowalczyk on LinkedIn (opens in a new tab)"
            className="inline-flex items-center gap-2 border-b border-[var(--color-fg)] pb-1 text-sm font-medium text-[var(--color-fg)] transition-opacity hover:opacity-70"
          >
            LinkedIn
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
