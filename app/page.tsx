import Link from "next/link";
import { caseStudies, site } from "@/lib/caseStudies";
import { siteUrl } from "./layout";
import { CopyEmail } from "@/components/CopyEmail";
import { ZoomImage } from "@/components/ZoomImage";
import { asset } from "@/lib/asset";

const stats = [
  { v: "2×", l: "patient volume at the clinic I run growth for" },
  { v: "310+", l: "AI replies published, every one human-approved" },
  { v: "100K+", l: "leads processed by the CRM I built" },
  { v: "13", l: "locations running my systems in production" },
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
  jobTitle: "AI automation engineer",
  email: `mailto:${site.email}`,
  url: siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
  sameAs: [site.github, site.linkedin],
  knowsAbout: [
    "AI automation", "Workflow automation", "AI agents", "Claude API",
    "Model Context Protocol", "Make.com", "Python", "FastAPI", "Webhooks",
    "Node.js", "PostgreSQL", "Next.js", "React Native",
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
            <span><b>Available</b> for full-time, part-time &amp; contract · Remote · UTC+2</span>
          </span>
          <span className="kicker">AI Automation Engineer · LLM Workflows, Agents &amp; Integrations</span>
          <h1>
            Automation,
            <br />
            <strong>built to stay running.</strong>
          </h1>
          <p className="lede">
            I&apos;m {site.name} — I design, ship and operate <b>production</b> AI
            automation: LLM workflows, agent systems and the integrations around
            them, end to end, with a person in the loop where it matters. Real,
            live systems — not prototypes.
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
          {/* Ordered by what a hiring manager should read first: the one with a
              business outcome attached, then the AI automation flagship. */}
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
                I co-founded <b>KROWDLY</b>, where I ship web and mobile applications
                end to end for restaurant, hospitality, and local-service
                businesses. Along the way I built a high-volume sales CRM for a
                35-agent team, an AI review-reply pipeline, and a cross-platform
                client app now in production across 13 locations.
              </p>
              <p>
                For <b>Bright Bite</b> I do both halves of the job: I built the
                platform the clinic runs on, and I run its growth — ads, SEO,
                booking and follow-up automation. The practice went from
                <b> 40–50 to 90–100 patients a week</b>.
              </p>
              <p>
                Where I add the most value is <b>AI automation</b> — LLM workflows
                and agentic systems built on the Claude API and the Model Context
                Protocol, wired into real business processes through webhooks and
                platform APIs, always behind human-in-the-loop controls. Dedup,
                error paths, audit logs and approval gates are part of the design,
                not bolted on after. If you need automation that survives contact
                with production, let&apos;s talk.
              </p>
            </div>
            <div className="about-side">
              <div className="lbl">What I build</div>
              <ul>
                <li>LLM workflows &amp; agent systems</li>
                <li>Webhook &amp; API automation</li>
                <li>Approval queues &amp; human-in-the-loop gates</li>
                <li>Production web &amp; cross-platform apps</li>
              </ul>
              <div className="lbl">Stack</div>
              <ul>
                <li>Claude API · MCP · agentic workflows</li>
                <li>n8n · Make.com · webhooks</li>
                <li>Python / FastAPI · Node.js · TypeScript</li>
                <li>PostgreSQL / Supabase · AWS</li>
                <li>Next.js · React Native</li>
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

      {/* Hiring — for people evaluating me for a role rather than a project */}
      <section className="section" id="hiring">
        <div className="container">
          <div className="sec-head">
            <div>
              <span className="kicker">Hiring</span>
              <h2>What I&apos;m looking for.</h2>
            </div>
          </div>
          <div className="about-grid">
            <div>
              <p>
                I&apos;m open to <b>full-time, part-time and contract</b> work in
                AI automation and AI engineering — building the LLM workflows,
                agent systems and integrations a business actually runs on, and
                staying to operate them.
              </p>
              <p>
                What I bring that is harder to hire for than the stack: I have
                shipped these systems <b>alone, end to end, into production</b>,
                and I have sat with the clients whose businesses depend on them.
                I ran a B2B sales cycle before I automated one, and I currently
                run growth for a client as well as their engineering — so I start
                from what the business needs, not from what is interesting to
                build.
              </p>
              <p>
                Cairo, <b>UTC+2</b> (UTC+3 April–October). That is a full working
                day of overlap with European and Gulf teams and a solid US-morning
                window. I work any schedule and I can start immediately.
              </p>
            </div>
            <div className="about-side">
              <div className="lbl">Roles</div>
              <ul>
                <li>AI Automation / Workflow Engineer</li>
                <li>AI &amp; LLM Engineer</li>
                <li>Forward Deployed / Solutions Engineer</li>
                <li>GTM Engineer</li>
              </ul>
              <div className="lbl">Availability</div>
              <ul>
                <li>Full-time · part-time · contract</li>
                <li>Remote worldwide · any schedule</li>
                <li>Available immediately</li>
              </ul>
              <div className="lbl">Working with</div>
              <ul>
                <li>Claude API · MCP · agent workflows</li>
                <li>n8n · Make.com · webhooks</li>
                <li>Python / FastAPI · Node · Postgres</li>
              </ul>
            </div>
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
              Available for full-time, part-time and contract work — AI automation,
              LLM systems, and the integrations around them. The fastest way to
              reach me is email.
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
