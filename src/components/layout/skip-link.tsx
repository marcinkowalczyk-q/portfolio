type Props = { label: string };

// First focusable element on every page; hidden until focused
export default function SkipLink({ label }: Props) {
  return (
    <a
      href="#main"
      className="sr-only rounded-[6px] bg-[var(--color-bg)] text-sm font-medium text-[var(--color-fg)] focus:not-sr-only focus:fixed focus:px-4 focus:py-3 focus:top-3 focus:left-3 focus:z-50 focus:border focus:border-[var(--color-control-border)]"
    >
      {label}
    </a>
  );
}
