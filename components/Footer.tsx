import { site } from "@/lib/caseStudies";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container inner">
        <span className="copy">© {new Date().getFullYear()} {site.name}</span>
        <span className="tagline">{site.tagline}</span>
      </div>
    </footer>
  );
}
