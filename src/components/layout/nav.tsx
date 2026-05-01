import Link from "next/link";

export default function Nav() {
  return (
    <header className="w-full border-b border-[var(--color-border)]">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10"
      >
        <Link
          href="/"
          className="text-sm font-medium text-[var(--color-fg)] tracking-tight"
        >
          Marcin Kowalczyk
        </Link>
        <ul className="flex items-center gap-8 text-sm">
          <li>
            <Link
              href="/"
              className="text-[var(--color-fg)] hover:opacity-70 transition-opacity"
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-[var(--color-fg)] hover:opacity-70 transition-opacity"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
