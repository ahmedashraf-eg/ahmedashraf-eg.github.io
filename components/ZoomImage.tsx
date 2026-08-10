"use client";

import { useState } from "react";
import { Lightbox } from "./Lightbox";
import { asset } from "@/lib/asset";

/**
 * A single expandable image. Used for the home-page work thumbnails, which sit
 * inside a link to the case study — so the click is intercepted here and the
 * rest of the row still navigates.
 */
export function ZoomImage({
  src,
  cap,
  className,
}: {
  src: string;
  cap: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <span
        role="button"
        tabIndex={0}
        className={`zoomable ${className ?? ""}`}
        aria-label={`Expand image: ${cap}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            setOpen(true);
          }
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(src)} alt={cap} loading="lazy" />
        <span className="zoom-badge" aria-hidden>
          ⤢
        </span>
      </span>

      {open && (
        <Lightbox
          items={[{ src: asset(src), cap }]}
          index={0}
          onIndex={() => {}}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
