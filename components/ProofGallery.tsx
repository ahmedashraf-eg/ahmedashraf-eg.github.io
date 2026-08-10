"use client";

import { useState } from "react";
import type { Shot } from "@/lib/caseStudies";
import { Lightbox } from "./Lightbox";
import { asset } from "@/lib/asset";

export function ProofGallery({
  shots,
  layout,
}: {
  shots: Shot[];
  layout: "wide" | "phones";
}) {
  const [open, setOpen] = useState<number | null>(null);
  const isPhones = layout === "phones";

  return (
    <>
      <div className={`proof-grid ${isPhones ? "phones" : ""}`}>
        {shots.map((shot, i) => (
          <figure className={`shot ${isPhones || shot.phone ? "phone" : ""}`} key={shot.src}>
            <button
              type="button"
              className="shot-btn"
              onClick={() => setOpen(i)}
              aria-label={`Expand image: ${shot.cap}`}
            >
              <div className="frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(shot.src)}
                  alt={shot.cap}
                  width={shot.w}
                  height={shot.h}
                  loading="lazy"
                  decoding="async"
                />
                <span className="zoom-badge" aria-hidden>
                  ⤢
                </span>
              </div>
            </button>
            <figcaption className="cap">
              <span className="cn">{String(i + 1).padStart(2, "0")}</span>
              <span>{shot.cap}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {open !== null && (
        <Lightbox
          items={shots.map((s) => ({ src: asset(s.src), cap: s.cap }))}
          index={open}
          onIndex={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}
