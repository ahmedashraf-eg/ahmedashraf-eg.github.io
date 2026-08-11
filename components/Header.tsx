import Link from "next/link";
import { site } from "@/lib/caseStudies";

export function Header() {
  return (
    <header className="site-header">
      <div className="container inner">
        <Link href="/" className="wordmark" aria-label="Ahmed Ashraf — home">
          <span className="a1">Ahmed</span> <span className="a2">Ashraf</span>
        </Link>
        <nav className="nav">
          <Link href="/#work" className="nav-hide">Work</Link>
          <Link href="/#about" className="nav-hide">About</Link>
          <Link href="/#hiring" className="nav-hide">Hiring</Link>
          <a href={`mailto:${site.email}`} className="nav-cta">Contact</a>
        </nav>
      </div>
    </header>
  );
}
