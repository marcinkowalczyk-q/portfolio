"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Icon from "@/components/ui/icon";

// full: a separate lightbox file (Figure fullSrc), served as is at full resolution
type Item = { src: string; alt: string; caption?: string; width: number; height: number; full: boolean };

type Props = {
  labels: { close: string; prev: string; next: string; pan: string };
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
    full: d.full !== undefined,
  };
}

// Dialog padding: p-4, md:p-10
const padding = (viewportWidth: number) => (viewportWidth >= 768 ? 40 : 16);

// Wraps one case study section. Any [data-lightbox] button inside opens the image
// in a native modal <dialog>; ←/→ move between the section's images.
// Images are 2x exports: one that is wider than the viewport at its natural size (half its
// pixel width) opens in a scrollable, focusable area instead of being shrunk to fit.
// Pinch-zoom is the browser's own (touch-action stays auto, the viewport allows zoom).
export default function Lightbox({ labels, className = "", children }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [index, setIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const onClick = (event: MouseEvent) => {
      const button = (event.target as Element).closest<HTMLElement>("[data-lightbox]");
      if (!button || !root.contains(button)) return;
      const buttons = Array.from(root.querySelectorAll<HTMLElement>("[data-lightbox]"));
      openerRef.current = button;
      setViewportWidth(window.innerWidth);
      setItems(buttons.map(toItem));
      setIndex(buttons.indexOf(button));
      dialogRef.current?.showModal();
    };
    const onResize = () => setViewportWidth(window.innerWidth);
    root.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);
    return () => {
      root.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);
  const step = useCallback(
    (delta: number) => setIndex((i) => (i + delta + items.length) % items.length),
    [items.length]
  );

  const item = items[index];
  const several = items.length > 1;
  // A separate full file (a whole diagram) opens at half that size, so there is some overview
  // to start from: touch screens can only pinch-zoom in, and the 2x file stays sharp when they do
  const density = item?.full ? 4 : 2;
  const natural = item
    ? { width: Math.round(item.width / density), height: Math.round(item.height / density) }
    : null;
  const pan = Boolean(natural && natural.width > viewportWidth - 2 * padding(viewportWidth));

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
          // In the scroll area the arrow keys scroll the image instead
          if ((event.target as Element).closest("[data-pan]")) return;
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        className="m-0 h-dvh max-h-none w-dvw max-w-none bg-transparent p-4 backdrop:bg-[rgb(21_21_21/0.85)] md:p-10"
      >
        {item && natural && (
          <div
            className="flex h-full flex-col items-center justify-center gap-4"
            onClick={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <div className="flex w-full shrink-0 justify-end gap-2">
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
            {pan ? (
              // Focusable so keyboard users can scroll it with the arrow keys; pinch-zoom works on touch
              <div
                key={item.src}
                data-pan=""
                role="region"
                tabIndex={0}
                aria-label={`${labels.pan}: ${item.alt}`}
                className="grid min-h-0 w-full flex-1 place-items-center-safe overflow-auto overscroll-contain rounded-md"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={natural.width}
                  height={natural.height}
                  sizes={`${natural.width}px`}
                  unoptimized={item.full}
                  className="max-w-none rounded-md motion-safe:animate-lightbox-in"
                />
              </div>
            ) : (
              <Image
                key={item.src}
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="100vw"
                unoptimized={item.full}
                className="h-auto max-h-[calc(100%-8rem)] w-auto max-w-full min-h-0 rounded-md object-contain motion-safe:animate-lightbox-in"
              />
            )}
            {item.caption && (
              <p className="max-w-text shrink-0 text-center text-body-sm text-[var(--color-bg)]">
                {item.caption.replace(/\*\*/g, "")}
              </p>
            )}
          </div>
        )}
      </dialog>
    </div>
  );
}
