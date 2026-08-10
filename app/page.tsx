import Link from "next/link";
import { caseStudies, site } from "@/lib/caseStudies";
import { siteUrl } from "./layout";
import { CopyEmail } from "@/components/CopyEmail";
import { ZoomImage } from "@/components/ZoomImage";
import { asset } from "@/lib/asset";

const stats = [
  { v: "13", l: "locations live in production" },
  { v: "100K+", l: "leads processed through the CRM" },
  { v: "310+", l: "review replies, human-approved" },
  { v: "96", l: "automated tests on the CRM" },
];

const principles = [
  { n: "01", h: "Shipped, not prototyped", p: "I build systems that reach production and stay there — real users, real data, real uptime — not demos that die in a branch." },
  { n: "02", h: "One owner, whole stack", p: "Architecture, implementation, integrations, deployment. Fewer handoffs means fewer things lost in translation." },
  { n: "03", h: "Human-in-the-loop AI", p: "AI proposes; a person approves. I add automation where it compounds and guardrails where it matters." },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Full-stack developer (web, mobile & AI)",
  email: `mailto:${site.email}`,
  url: siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
  sameAs: [site.github, site.linkedin],
  knowsAbout: [
    "React", "Next.js", "React Native", "Node.js", "PostgreSQL",
    "AI integration", "Claude API", "Model Context Protocol",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <span className="avail">
            <span className="dot" aria-hidden />
            <span><b>Available</b> for freelance &amp; contract · Remote · UTC+2</span>
          </span>
          <span className="kicker">Full-stack developer · Web, Mobile &amp; AI</span>
          <h1>
            Software,
            <br />
            <strong>thoughtfully made.</strong>
          </h1>
          <p className="lede">
            I&apos;m {site.name} — I design and ship <b>production</b> web and mobile
            apps end to end, from the database to the deployed product, with a
            specialty in <b>AI integration</b>. Real, live systems — not prototypes.
          </p>
          <div className="hero-actions">
            <Link href="#work" className="btn btn-solid">
              View work <span className="arrow">→</span>
            </Link>
            <a href={asset(site.cv)} className="btn btn-ghost" download>
              Download CV
            </a>
            <a href={`mailto:${site.email}`} className="btn btn-ghost">
              Get in touch
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container" style={{ paddingBottom: "8px" }}>
        <div className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.l}>
              <div className="v">{s.v}</div>
              <div className="l">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Work */}
      <section className="section" id="work">
        <div className="container">
          <div className="sec-head">
            <div>
              <span className="kicker">Selected work</span>
              <h2>Four systems, running in production.</h2>
            </div>
          </div>
          <div className="work-list">
            {caseStudies.map((c) => (
              <Link href={`/work/${c.slug}`} className="work-item" key={c.slug}>
                <div className="idx">{c.index}</div>
                <ZoomImage
                  src={c.thumb}
                  cap={c.card.title}
                  className="wi-thumb"
                />
                <div className="body">
                  <div className="t">{c.card.title}</div>
                  <div className="d">{c.card.desc}</div>
                  <div className="tags">
                    {c.card.tags.map((t) => (
                      <span className="tag" key={t}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="go" aria-hidden>→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section" id="about">
        <div className="container">
          <div className="sec-head">
            <div>
              <span className="kicker">About</span>
              <h2>The whole build, one owner.</h2>
            </div>
          </div>
          <div className="about-grid">
            <div>
              <p>
                Over the last <b>2+ years</b> I&apos;ve delivered complete, live
                products on tight timelines as the sole owner of the whole build —
                architecture, implementation, integrations, and deployment.
              </p>
              <p>
                I founded <b>KROWDLY</b>, where I ship web and mobile applications
                end to end for restaurant, hospitality, and local-service
                businesses. Along the way I built a high-volume sales CRM for a
                35-agent team, an AI review-reply pipeline, and a cross-platform
                client app now in production across 13 locations.
              </p>
              <p>
                Where I add the most value right now is <b>AI integration</b> —
                LLM-powered features and agentic workflows built with the Claude API
                and the Model Context Protocol, always with human-in-the-loop
                controls. If you need a website, a cross-platform app, or an AI
                feature built and shipped — not just prototyped — let&apos;s talk.
              </p>
            </div>
            <div className="about-side">
              <div className="lbl">What I build</div>
              <ul>
                <li>Production web apps (React / Next.js)</li>
                <li>Cross-platform apps (React Native)</li>
                <li>AI features &amp; agent workflows</li>
                <li>APIs, data models &amp; integrations</li>
              </ul>
              <div className="lbl">Stack</div>
              <ul>
                <li>TypeScript · Node.js · Express</li>
                <li>PostgreSQL / Supabase · AWS</li>
                <li>Claude API · MCP · LLM apps</li>
              </ul>
              <div className="lbl">Based</div>
              <ul>
                <li>{site.location}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How I work */}
      <section className="section" id="how">
        <div className="container">
          <div className="sec-head">
            <div>
              <span className="kicker">How I work</span>
              <h2>A few principles I build by.</h2>
            </div>
          </div>
          <div className="how-grid">
            {principles.map((pr) => (
              <div className="how" key={pr.n}>
                <div className="n">{pr.n}</div>
                <h3>{pr.h}</h3>
                <p>{pr.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — renders only once real quotes are added to site.testimonials */}
      {site.testimonials.length > 0 && (
        <section className="section" id="words">
          <div className="container">
            <div className="sec-head">
              <div>
                <span className="kicker">What people say</span>
                <h2>In their words.</h2>
              </div>
            </div>
            <div className="quote-grid">
              {site.testimonials.map((t, i) => (
                <figure className="quote" key={i}>
                  <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption>
                    <b>{t.name}</b>
                    <span>{t.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="section" id="contact">
        <div className="container">
          <div className="contact">
            <span className="kicker">Contact</span>
            <h2>
              Let&apos;s build something
              <br />
              <strong>real.</strong>
            </h2>
            <p>
              Available for freelance and contract work — web, mobile, and AI.
              The fastest way to reach me is email.
            </p>
            <div className="contact-actions">
              <a href={`mailto:${site.email}`} className="btn btn-solid">
                {site.email}
              </a>
              <CopyEmail />
            </div>
            <div className="links">
              <a href={site.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={asset(site.cv)} download>Résumé (PDF)</a>
              <a href={`mailto:${site.email}`}>Email</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
