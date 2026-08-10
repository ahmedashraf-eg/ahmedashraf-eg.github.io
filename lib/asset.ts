/**
 * Prefix a public-folder path with the deployment's base path.
 *
 * Next rewrites `<Link href>` and its own bundles for `basePath` automatically,
 * but plain `<img src="/…">` and `<a href="/…">` it does not. On a GitHub Pages
 * *project* site (username.github.io/repo) every one of those would 404 without
 * this. On a user site the base path is empty and this is a no-op.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!BASE) return path;
  return path.startsWith("/") ? `${BASE}${path}` : `${BASE}/${path}`;
}
