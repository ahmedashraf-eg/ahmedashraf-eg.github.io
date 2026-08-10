"use client";

import { useCallback, useEffect } from "react";

export type LightboxItem = { src: string; cap: string };

/**
 * The shared full-screen image viewer. Used by every expandable image on the
 * site — the case-study proof galleries and the home-page work thumbnails.
 * Arrow keys and Escape work whenever there is more than one item.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const many = items.length > 1;

  const prev = useCallback(
    () => onIndex((index - 1 + items.length) % items.length),
    [index, items.length, onIndex]
  );
  const next = useCallback(
    () => onIndex((index + 1) % items.length),
    [index, items.length, onIndex]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (many && e.key === "ArrowLeft") prev();
      else if (many && e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next, many]);

  const item = items[index];
  if (!item) return null;

  return (
    <div
      className="lightbox"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <button className="lb-close" onClick={onClose} aria-label="Close viewer">
        ✕
      </button>

      {many && (
        <button
          className="lb-nav lb-prev"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label="Previous image"
        >
          ‹
        </button>
      )}

      <figure className="lb-figure" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.src} alt={item.cap} decoding="async" />
        <figcaption>
          {many && (
            <span className="cn">{String(index + 1).padStart(2, "0")}</span>
          )}
          <span className="lb-cap">{item.cap}</span>
          {many && (
            <span className="lb-count">
              {index + 1} / {items.length}
            </span>
          )}
        </figcaption>
      </figure>

      {many && (
        <button
          className="lb-nav lb-next"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Next image"
        >
          ›
        </button>
      )}
    </div>
  );
}
