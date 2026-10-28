"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Icon from "@/components/ui/icon";

type Item = { src: string; alt: string; caption?: string; width: number; height: number };

type Props = {
  labels: { close: string; prev: string; next: string };
  className?: string;
  children: ReactNode;
};

const iconButton =
  "inline-flex size-11 items-center justify-center rounded-md bg-[var(--color-bg)] text-[var(--color-fg)] transition-opacity hover:opacity-70";

function toItem(button: HTMLElement): Item {
  const d = button.dataset;
  return {
    src: d.src ?? "",
    alt: d.alt ?? "",
    caption: d.caption || undefined,
    width: Number(d.width),
    height: Number(d.height),
  };
}

// Wraps one case study section. Any [data-lightbox] button inside opens the image
// in a native modal <dialog>; ←/→ move between the section's images.
export default function Lightbox({ labels, className = "", children }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const onClick = (event: MouseEvent) => {
      const button = (event.target as Element).closest<HTMLElement>("[data-lightbox]");
      if (!button || !root.contains(button)) return;
      const buttons = Array.from(root.querySelectorAll<HTMLElement>("[data-lightbox]"));
      openerRef.current = button;
      setItems(buttons.map(toItem));
      setIndex(buttons.indexOf(button));
      dialogRef.current?.showModal();
    };
    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);
  const step = useCallback(
    (delta: number) => setIndex((i) => (i + delta + items.length) % items.length),
    [items.length]
  );

  const item = items[index];
  const several = items.length > 1;

  return (
    <div ref={rootRef} className={className}>
      {children}
      <dialog
        ref={dialogRef}
        aria-label={item ? item.caption ?? item.alt : undefined}
        onClose={() => openerRef.current?.focus()}
        onClick={(event) => {
          // Backdrop click: the dialog itself is the target, not its content
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (!several) return;
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        className="m-0 h-dvh max-h-none w-dvw max-w-none bg-transparent p-4 backdrop:bg-[rgb(21_21_21/0.85)] md:p-10"
      >
        {item && (
          <div
            className="flex h-full flex-col items-center justify-center gap-4"
            onClick={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <div className="flex w-full justify-end gap-2">
              {several && (
                <>
                  <button type="button" onClick={() => step(-1)} aria-label={labels.prev} className={iconButton}>
                    <Icon name="arrow-left" size={20} />
                  </button>
                  <button type="button" onClick={() => step(1)} aria-label={labels.next} className={iconButton}>
                    <Icon name="arrow-right" size={20} />
                  </button>
                </>
              )}
              <button type="button" onClick={close} aria-label={labels.close} className={iconButton} autoFocus>
                <Icon name="close" size={20} />
              </button>
            </div>
            <Image
              key={item.src}
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              sizes="100vw"
              className="h-auto max-h-[calc(100%-8rem)] w-auto max-w-full min-h-0 rounded-md object-contain motion-safe:animate-lightbox-in"
            />
            {item.caption && (
              <p className="max-w-text text-center text-body-sm text-[var(--color-bg)]">{item.caption.replace(/\*\*/g, "")}</p>
            )}
          </div>
        )}
      </dialog>
    </div>
  );
}
