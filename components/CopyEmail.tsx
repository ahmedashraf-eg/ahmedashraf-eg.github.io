"use client";

import { useState } from "react";
import { site } from "@/lib/caseStudies";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

  return (
    <button className="copy-email" onClick={copy} type="button" aria-label="Copy email address">
      {copied ? "Copied ✓" : "Copy email"}
    </button>
  );
}
