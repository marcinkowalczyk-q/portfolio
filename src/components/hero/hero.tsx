export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto max-w-6xl px-6 pt-20 pb-24 md:px-10 md:pt-28 md:pb-32"
    >
      <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
        Senior UX Designer
      </p>
      <h1
        id="hero-heading"
        className="mt-6 text-4xl leading-[1.05] tracking-tight text-[var(--color-fg)] md:text-6xl lg:text-7xl"
      >
        Marcin Kowalczyk
      </h1>
      <p className="mt-6 max-w-2xl text-base text-[var(--color-fg-muted)] md:text-lg">
        Complex digital products · Product &amp; technology
      </p>
      <p className="mt-10 max-w-2xl text-lg leading-relaxed text-[var(--color-fg)] md:text-xl">
        Hi! I&apos;m a designer who likes complicated products and making them
        feel simple. Most of my work is understanding what&apos;s really going
        on and shaping it into something people can actually use.
      </p>
    </section>
  );
}
