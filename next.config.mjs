/** @type {import('next').NextConfig} */

// GitHub Pages serves a *project* repo under /<repo>, and a <user>.github.io
// repo at the root. The workflow passes the right value in; locally it's empty.
const rawBase = process.env.PAGES_BASE_PATH ?? "";
const basePath = rawBase === "/" ? "" : rawBase.replace(/\/$/, "");

const nextConfig = {
  reactStrictMode: true,

  // Static export — every page here is prerendered, so there is nothing to run
  // on a server. This is what GitHub Pages serves.
  output: "export",

  // Emit /work/clinic/index.html rather than /work/clinic.html, so clean URLs
  // resolve on a plain static host.
  trailingSlash: true,

  // No next/image on this site, but export mode requires the flag to be explicit.
  images: { unoptimized: true },

  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,

  // Exposed to the client so lib/asset.ts can prefix plain <img>/<a> paths,
  // which Next does not rewrite for us.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
