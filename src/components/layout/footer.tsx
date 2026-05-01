export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-[var(--color-border)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 text-sm text-[var(--color-fg-muted)] md:flex-row md:items-center md:justify-between md:px-10">
        <p>Marcin Kowalczyk / Portfolio</p>
        <p>&copy; {year}</p>
      </div>
    </footer>
  );
}
