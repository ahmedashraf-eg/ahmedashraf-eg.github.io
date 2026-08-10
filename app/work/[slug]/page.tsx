import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudies, getCaseStudy } from "@/lib/caseStudies";
import { ProofGallery } from "@/components/ProofGallery";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const c = getCaseStudy(params.slug);
  if (!c) return { title: "Not found" };
  return {
    title: `${c.card.title} — Ahmed Ashraf`,
    description: c.cover.sub,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: {
      title: `${c.card.title} — Ahmed Ashraf`,
      description: c.cover.sub,
      type: "article",
    },
  };
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const c = getCaseStudy(params.slug);
  if (!c) notFound();

  const idx = caseStudies.findIndex((x) => x.slug === c.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <article>
      <div className="container">
        <div className="cs-back">
          <Link href="/#work">← All work</Link>
        </div>

        {/* Inverse cover */}
        <header className="cs-cover">
          <span className="kicker">{c.cover.kicker}</span>
          <h1>{c.cover.title}</h1>
          <p className="sub">{c.cover.sub}</p>
          {c.live && c.live.length > 0 && (
            <div className="cover-live">
              {c.live.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          )}
          <div className="cs-meta">
            <div>
              <div className="k">Client</div>
              <div className="val">{c.meta.client}</div>
            </div>
            <div>
              <div className="k">Role</div>
              <div className="val">{c.meta.role}</div>
            </div>
            <div>
              <div className="k">Timeline</div>
              <div className="val">{c.meta.timeline}</div>
            </div>
            <div>
              <div className="k">Focus</div>
              <div className="val">{c.meta.focus}</div>
            </div>
          </div>
        </header>

        {/* Body */}
        <div style={{ paddingTop: "40px" }}>
          {c.sections.map((s) => (
            <div className="cs-blockwrap" key={s.num}>
              <div className="lbl">
                <span className="n">{s.num}</span>
                {s.label}
              </div>
              <div
                className="cs-prose"
                dangerouslySetInnerHTML={{ __html: s.html }}
              />
            </div>
          ))}

          {/* Stack */}
          <div className="cs-blockwrap">
            <div className="lbl">
              <span className="n">
                {String(c.sections.length + 1).padStart(2, "0")}
              </span>
              Stack
            </div>
            <div className="stack">
              {c.stack.map((s) => (
                <span className="chip" key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Proof */}
        <section className="proof">
          <div className="sec-head">
            <div>
              <span className="kicker">Proof</span>
              <h2>The system, running.</h2>
            </div>
          </div>
          <ProofGallery shots={c.proof.shots} layout={c.proof.layout} />
        </section>

        {/* Next case */}
        <nav className="cs-next">
          <div>
            <div className="lbl">Next case</div>
            <Link href={`/work/${next.slug}`}>
              <div className="t">{next.card.title}</div>
            </Link>
          </div>
          <Link href={`/work/${next.slug}`} className="btn btn-ghost">
            Next <span className="arrow">→</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
