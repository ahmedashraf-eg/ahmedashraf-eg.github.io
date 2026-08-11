export type Shot = { src: string; cap: string; phone?: boolean; w?: number; h?: number };
export type Section = { num: string; label: string; html: string };
export type LiveLink = { label: string; href: string };
export type Testimonial = { quote: string; name: string; role: string };
export type CaseStudy = {
  slug: string;
  index: string;
  thumb: string;
  card: { title: string; desc: string; tags: string[] };
  cover: { kicker: string; title: string; sub: string };
  meta: { client: string; role: string; timeline: string; focus: string };
  sections: Section[];
  stack: string[];
  live?: LiveLink[];
  proof: { layout: "wide" | "phones"; shots: Shot[] };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "clinic",
    index: "01",
    thumb: "/work/clinic/clinic-01-day-view.png",
    card: {
      title: "Bright Bite — a clinic platform in three weeks, and twice the patients",
      desc: "The practice went from 40–50 to 90–100 patients a week. I built everything behind that number: the platform it runs on — reception and clinical records, tooth charting, billing, bilingual booking, patient self check-in — plus the ads, the SEO and the WhatsApp automation that fill the diary.",
      tags: ["40–50 → 90–100 patients/week", "Postgres · RLS · Supabase", "n8n · WhatsApp · LLM routing"],
    },
    cover: {
      kicker: "Case 01 — Platform · Growth · Healthcare",
      title: "A dental practice rebuilt end to end — where a missing warning is a clinical statement",
      sub: "Bright Bite, Cairo · live and running the practice · 40–50 → 90–100 patients a week · patients book and check themselves in online · 48 migrations, 90 RLS policies, 51 database functions, 11 edge functions, a 19-step CI gate · built in three weeks.",
    },
    meta: {
      client: "Bright Bite · dental clinic, Cairo",
      role: "Sole engineer + business development — platform, automation, acquisition",
      timeline: "Feb 2026 – present · ~3 weeks to live",
      focus: "Clinical safety, data integrity, bilingual UX, patient acquisition",
    },
    sections: [
      {
        num: "01",
        label: "Problem",
        html: `<p>A Cairo dental clinic ran the way most clinics do: appointments in a spreadsheet, patient histories in a folder and in the dentist's head, reminders sent when somebody remembered, and the clinic's WhatsApp on the receptionist's personal phone.</p><p>Every one of those is a small gap. Together they are lost revenue, no-shows already paid for in chair time, and a clinical risk the owner carries personally — because the question nobody could reliably answer was <i>did anyone check whether this patient is on blood thinners before we started?</i></p>`,
      },
      {
        num: "02",
        label: "Constraints",
        html: `<p><b>The clinic could not stop working.</b> A live practice can't pause for a migration, so the existing spreadsheet-and-automation system had to keep running untouched while its replacement was built beside it — and the cutover had to be reversible.</p><p><b>Arabic is not a translation layer.</b> Staff and patients work in Arabic; the accountant works in Latin digits. The interface had to mirror properly — layout, navigation, forms, tables — while keeping Arabic month names and Latin numerals side by side on an invoice.</p><p><b>Clinical data has no acceptable failure mode.</b> A record that can be quietly edited isn't evidence. A screen that looks clean when it failed to load is worse than an error. These set the architecture more than any feature did.</p>`,
      },
      {
        num: "03",
        label: "The system",
        html: `<p>Four pieces, one database. A <b>reception and clinical app</b> (React 18 + Vite, bilingual with full RTL) that the whole practice works from; a <b>public marketing and booking site</b> (Astro on Cloudflare Pages, English with a complete Arabic mirror); a <b>Postgres backend</b> on Supabase with row-level security, 51 database functions and 11 Deno edge functions; and a <b>WhatsApp automation layer</b> on the clinic's own hardware.</p><p><b>The clinical record.</b> An interactive FDI tooth chart — permanent and primary dentition, surface-level selection, crown and root zones — feeding treatment plans whose visits link to real appointments. Clinical notes are written, then <i>signed</i>: signing is final, hashed server-side, and enforced by a database trigger rather than a disabled button. Prescriptions print on the clinic's own letterhead; X-rays open through short-lived signed links and are never cached in the browser.</p><p><b>Money.</b> The application performs no financial arithmetic at all — every balance, allocation and total is computed by the database and displayed. Payments are append-only: a mistake is corrected with a reversal row, never an edit. Invoices freeze a snapshot at issue, so a reprint two years later is byte-identical to the original.</p><p><b>Four booking channels, one diary.</b> Website, walk-in, phone, and the legacy spreadsheet bridge — each appointment carrying a badge showing where it came from. Website bookings are highlighted because they're the only ones no member of staff witnessed, and one lands in a reception triage queue whenever human judgement is needed — most importantly when the phone number already belongs to an existing patient. Reception sees both names side by side and must explicitly confirm before the records are joined. Attaching a stranger's booking to someone else's chart is exactly the failure that prevents.</p><p><b>WhatsApp, unattended.</b> Reminders at 24 and 3 hours, respecting quiet hours, never sent twice. Confirm and cancel buttons update the diary directly. Free text is classified by a language model — and anything it cannot classify with confidence is escalated to a human by Telegram rather than guessed at. Nothing medical is ever answered by a model.</p>`,
      },
      {
        num: "04",
        label: "Decisions that mattered",
        html: `<div class="decision"><h4>Silence never means safe.</h4><p>The most repeated principle in the codebase. If the system can't load a patient's medical alerts, it says so in amber — <i>"do not rely on the absence of a risk warning"</i> — instead of rendering a clean screen. A missing warning is a clinical statement, and the system refuses to make one it can't back. The same rule governs the calendar, consent records, and every queued write that fails.</p></div><div class="decision"><h4>One permission matrix, three consumers.</h4><p>Every row-level security policy is generated from a single typed file — the same file that drives the front-end guards and the authorization test suite. Editing policy SQL by hand is blocked by CI. The result: 90 policies across 35 tables that cannot drift from the tests that prove them, and 92 role × table × verb assertions that run against a real Postgres. The active role only narrows what the UI offers; the database decides what's allowed.</p></div><div class="decision"><h4>Gapless invoice numbers meant deleting the obvious solution.</h4><p>Egypt's accountants need invoice numbers with no holes. The obvious implementation — a Postgres identity column — is wrong, because sequences are deliberately non-transactional: a rolled-back transaction burns its number forever. I dropped the identity column and replaced it with a locked counter row, so an aborted transaction <i>returns</i> its number, plus a statement-level trigger that catches the subtler hole where a row draws a number and is then discarded by an upsert.</p></div><div class="decision"><h4>Immutability the owner can't override.</h4><p>Signed notes, consent records and the audit log are locked at the database, not the interface — no update or delete policy exists for any role, including the owner, and the service key is not a superuser, so the trigger fires even on server-side paths. The test suite proves it by trying.</p></div><div class="decision"><h4>The offline queue that almost froze itself.</h4><p>Reception keeps working when the internet doesn't — bookings and chart edits queue on the device and replay in order, and writes resolve on transaction commit, so "saved, will sync" is literally true. The version number of that local database is deliberately pinned: bumping it fires a <i>blocked</i> event while another tab holds the old version, and reception always has two tabs open. The fix for a bug about losing writes would have frozen the write queue. Anything involving money never queues at all, and the screen says why.</p></div><div class="decision"><h4>The alarm must not live on the machine it watches.</h4><p>The clinic's server went down and took the automation, the CI runner and the nightly backup with it — and the monitoring reported zero open alerts, because the scanner that raises them was on the same box. It came back up unattended with the bridge fifteen seconds fresh and the queue drained, which is the recovery behaviour I'd designed for. The blind spot was mine, it's written into the handover, and it is on the list rather than quietly fixed in a sentence.</p></div>`,
      },
      {
        num: "05",
        label: "Proving it",
        html: `<p>A 19-step continuous-integration chain gates every change: schema drift, types, lint, ~332 unit tests, the generated-RLS check, immutability, ~80 financial invariants, booking-race tests against eight concurrent backends, storage-policy probes, an accessibility pass, and a golden replay of 364 assertions across thirty simulated clinic days. Every hardening gate carries a <b>negative control</b> — a step that deliberately breaks the thing being tested and fails if the test doesn't notice.</p><p>Two of those gates have already earned their cost: one caught a migration that silently reverted a security hardening pass, and another caught two missing indexes that <b>three human reviewers had missed</b>. Every batch reviewed on this project has had at least one real blocker on first pass — which is the argument for the gates, not against them.</p>`,
      },
      {
        num: "06",
        label: "In production",
        html: `<p><b>The clinic runs on it.</b> Reception works the diary from the app, doctors chart and sign in it, money moves through it, and patients book themselves at <a href="https://clinicbrightbite.com" target="_blank" rel="noreferrer">clinicbrightbite.com</a> — request accepted, patient and appointment created in one transaction. The reminder, reply-routing and review engines run unattended on the clinic's own hardware.</p><p>Cutover came off the back of a parallel run against the old spreadsheet system — the two compared night by night until they agreed — rather than off a launch date. The clinical phase was signed off by the dentist and the financial phase by the clinic's accountant, both before either was called done.</p><p>The newest piece wasn't in the original scope. Patients arriving at the clinic now check themselves in from their own phone with the number they booked with — no app, no login, one field. That came out of watching the front desk actually work, which is the part of this job you can't specify in advance.</p>`,
      },
    ],
    stack: [
      "PostgreSQL (RLS · 48 migrations · 90 policies)", "Supabase (Auth · Storage · Edge Functions)",
      "Deno (11 edge functions)", "React 18", "Vite", "TypeScript (strict)", "Astro 5",
      "Cloudflare Pages", "zod + OpenAPI 3.1 contracts", "IndexedDB offline queue",
      "n8n", "WhatsApp Cloud API", "Telegram ops alerts", "LLM intent classification",
      "pnpm monorepo", "self-hosted Gitea CI (19-step gate)", "Arabic RTL mirroring",
    ],
    live: [
      { label: "clinicbrightbite.com", href: "https://clinicbrightbite.com" },
      { label: "The app", href: "https://app.clinicbrightbite.com" },
    ],
    proof: {
      layout: "wide",
      shots: [
        { src: "/work/clinic/clinic-01-day-view.png", cap: "A worked afternoon — four booking sources, five statuses, and a high-risk patient flagged in the diary itself", w: 1558, h: 841 },
        { src: "/work/clinic/clinic-04-medical-alert-banner.png", cap: "What the system says when it knows: every reason spelled out, on top of every clinical screen", w: 1558, h: 652 },
        { src: "/work/clinic/clinic-03-alerts-unavailable.png", cap: "And what it says when it can't — amber, not silence: \u201cdo not rely on the absence of a risk warning\u201d", w: 1558, h: 776 },
        { src: "/work/clinic/clinic-02-tooth-chart.png", cap: "FDI tooth chart — surface-level selection, four statuses, and the anatomy the front desk never sees", w: 1520, h: 835 },
        { src: "/work/clinic/clinic-22-treatment-plan.png", cap: "A plan sequenced around the anticoagulant — the surgical extraction last, and only after an INR check", w: 1520, h: 1145 },
        { src: "/work/clinic/clinic-21-prescription.png", cap: "Clindamycin because penicillin is on file; no NSAIDs because of the warfarin. The record changes the prescription", w: 950, h: 365 },
        { src: "/work/clinic/clinic-10-signed-note-locked.png", cap: "The draft note has an Edit button. The signed note above it doesn't — enforced by the database, not the interface", w: 1558, h: 883 },
        { src: "/work/clinic/clinic-09-role-split.png", cap: "Same patient, same URL, two roles — reception gets fees and no anatomy; the doctor gets no billing tab at all", w: 1800, h: 421 },
        { src: "/work/clinic/clinic-05-triage-duplicate.png", cap: "A website booking whose phone already belongs to a patient — both names side by side, and an explicit confirm", w: 1558, h: 651 },
        { src: "/work/clinic/clinic-08-invoice.png", cap: "An issued invoice — gapless within the year, frozen on the letterhead it was issued under", w: 950, h: 652 },
        { src: "/work/clinic/clinic-11-payment-reversal.png", cap: "Append-only money — the reversal row carries no Reverse button, because reversing a reversal re-charges the patient", w: 954, h: 400 },
        { src: "/work/clinic/clinic-13-rtl-pair.png", cap: "The interface mirrors for Arabic. The tooth chart deliberately doesn't — dental notation is anatomy, not reading direction", w: 1800, h: 417 },
        { src: "/work/clinic/clinic-23-failed-write.png", cap: "The promise broke, so it says so — a failed offline write named in plain language, and it won't dismiss itself", w: 1554, h: 652 },
        { src: "/work/clinic/clinic-07-self-checkin.png", cap: "Patient self check-in — one field, no login, and a line saying exactly what the number is used for", phone: true, w: 780, h: 1688 },
        { src: "/work/clinic/clinic-06-website.png", cap: "clinicbrightbite.com — the public site, English with a full Arabic mirror", w: 1518, h: 639 },
        { src: "/work/clinic/clinic-17-reply-router.png", cap: "The reply router — buttons take the deterministic path; free text is classified, and anything medical is escalated, never answered", w: 1461, h: 648 },
        { src: "/work/clinic/clinic-24-automation-architecture.png", cap: "The automation topology (a diagram, not a screenshot) — the app never sends WhatsApp, and the automation never touches the database", w: 1600, h: 1231 },
        { src: "/work/clinic/clinic-28-cloudflare-access.png", cap: "The clinical app isn't a login form on the open internet — it sits behind an identity allowlist at the edge", w: 1568, h: 1096 },
      ],
    },
  },
  {
    slug: "reviews",
    index: "02",
    thumb: "/work/reviews/rev-01-approval-queue.png",
    card: {
      title: "AI review-reply automation",
      desc: "A five-step automation pipeline — watcher → webhook → LLM draft → human approval → auto-publish — that answers every Google review in the brand's voice, with a person approving every word.",
      tags: ["Automation pipeline", "LLM · JSON mode", "Human-in-the-loop"],
    },
    cover: {
      kicker: "Case 02 — AI automation",
      title: "An AI review-reply system — every word human-approved",
      sub: "Live in production across 7 US restaurants and 13 locations · 310+ replies approved and posted · 100% human-approved.",
    },
    meta: {
      client: "Multi-location NJ restaurant franchise",
      role: "Sole engineer — full stack",
      timeline: "2026",
      focus: "LLM drafting, approval UX, ops",
    },
    sections: [
      {
        num: "01",
        label: "Problem",
        html: `<p>A multi-location New Jersey restaurant franchise had hundreds of Google reviews and no system for answering them. Replies happened in bursts when someone remembered, then stopped for months. That silence costs twice: Google's local ranking rewards active, responsive profiles, and customers reading reviews judge the business by whether anyone answers.</p><p>The obvious fixes were both bad. Hiring someone to write replies all day doesn't survive a small-business budget. Fully automated AI replies were off the table on principle — nobody should discover that a robot apologized on their behalf for a bad review. The brief I set myself: <b>every review answered fast, in the brand's voice, with a human approving every word.</b></p>`,
      },
      {
        num: "02",
        label: "Constraints",
        html: `<p>Reading and replying to Google reviews programmatically requires an approved Google Business Profile API application — a multi-week process. The system had to launch <b>before that approval existed</b>. It also had to be operable by non-technical staff from a phone.</p>`,
      },
      {
        num: "03",
        label: "The pipeline",
        html: `<p>A new review triggers a five-step automation pipeline:</p><ol><li>A watcher detects the new review on the location's Google profile.</li><li>A self-hosted FastAPI service receives it over a secret-guarded webhook, deduplicates it against the queue, and asks an LLM for a draft reply (JSON mode) in the brand's voice.</li><li>The draft is queued in Postgres and the team gets an email with a one-tap link.</li><li>A team member opens a private, key-locked approval page (mobile-first, since approvals happen from phones), edits if needed, and hits Approve.</li><li>The approved text posts to Google automatically, usually appearing publicly within a minute.</li></ol><p>The Google-facing steps run through an automation platform (Make.com) that is already an approved Google partner — which is what let the system launch immediately instead of waiting weeks for API approval. Everything else — drafting, the queue, the approval UI, and notifications — is custom code I own end to end.</p><p>The reply drafts follow hard guardrails baked into the prompt: two to three sentences, warm, on-brand, never promising compensation, never admitting fault. Anything sensitive — including <b>every review of 3 stars or less</b> — is flagged "needs human" and badged red in the queue so it gets extra attention rather than a casual tap.</p>`,
      },
      {
        num: "04",
        label: "Decisions that mattered",
        html: `<div class="decision"><h4>Human approval as architecture, not policy.</h4><p>The publish step is physically separate from the drafting step and can only be triggered from the approval page. AI cannot post; it can only propose. That single design choice is why the owner trusts the system with their public reputation.</p></div><div class="decision"><h4>Portable by design.</h4><p>The whole system runs as systemd services behind an outbound secure tunnel, with no dependence on where it's hosted — it launched on self-hosted hardware and later moved to a rented VPS as it scaled. A lift-and-shift, not a re-architecture.</p></div><div class="decision"><h4>Vendor-proof by isolation.</h4><p>Mid-build, the originally planned LLM provider removed its free tier for new accounts. Because drafting sits behind a single interface, swapping providers was a one-file change — the same isolation applies to every third-party dependency in the system.</p></div>`,
      },
      {
        num: "05",
        label: "Results",
        html: `<p>The system is live and proven end to end: real customer reviews flow through drafting, phone approval, and automatic posting for a restaurant group scaling it across <b>7 restaurants and 13 locations</b>. <b>Over 310 replies</b> have been approved and posted. The recurring chore became a five-minute approval pass, and response time dropped from weeks-or-never to same-day. It was built to onboard additional businesses: adding a client is configuration, not code.</p>`,
      },
    ],
    stack: [
      "Python", "FastAPI", "Postgres (Supabase)", "LLM drafting (JSON mode)",
      "Make.com", "Webhooks (HMAC-guarded)", "Resend", "Cloudflare Tunnel", "systemd on Ubuntu",
    ],
    proof: {
      layout: "wide",
      shots: [
        { src: "/work/reviews/rev-01-approval-queue.png", cap: "Approval queue — AI drafts awaiting a human tap; low ratings flagged 'needs human'", w: 1920, h: 871 },
        { src: "/work/reviews/rev-02-watch-reviews.png", cap: "Automation — a watcher catches each new Google review and requests a draft", w: 1920, h: 866 },
        { src: "/work/reviews/rev-03-publish-reply.png", cap: "Automation — the approved reply is published back to Google", w: 1920, h: 867 },
        { src: "/work/reviews/rev-04-approval-email.png", cap: "The team gets a one-tap approval email", w: 1920, h: 872 },
        { src: "/work/reviews/rev-05-approve-mobile.png", cap: "Approve from your phone — mobile-first by design", w: 436, h: 941 },
        { src: "/work/reviews/rev-06-queue-schema.png", cap: "The Postgres approval queue", w: 1920, h: 869 },
        { src: "/work/reviews/rev-07-service.png", cap: "Self-hosted FastAPI service running under systemd", w: 1464, h: 751 },
        { src: "/work/reviews/rev-08-live-on-google.png", cap: "A reply live on Google — posted straight from the approval page", w: 1920, h: 866 },
      ],
    },
  },
  {
    slug: "crm",
    index: "03",
    thumb: "/work/crm/crm-01-admin-dashboard.png",
    card: {
      title: "Production CRM for a 35-agent sales team",
      desc: "A CRM shaped like one sales team's real process — the handoff enforced in the database, self-hosted, with zero open ports in production.",
      tags: ["React · TypeScript", "Node · Postgres", "Self-hosted"],
    },
    cover: {
      kicker: "Case 01 — Full-stack product",
      title: "A production CRM built for how one sales team actually works",
      sub: "Runs a US sales team's entire pipeline · 35 concurrent agents · 3,000+ leads/day (100,000+ processed) · sub-second lead routing · 96 automated tests · zero open ports in production.",
    },
    meta: {
      client: "US sales team · 35 agents",
      role: "Sole engineer — full stack",
      timeline: "2026 · ~4 months",
      focus: "Data model, routing, security",
    },
    sections: [
      {
        num: "01",
        label: "Problem",
        html: `<p>A sales team was running its pipeline on spreadsheets and an off-the-shelf CRM that fit like someone else's suit. Their process has two distinct roles: <b>openers (BDRs)</b> who dial new leads and book meetings, and <b>closers (AEs)</b> who claim qualified leads from a shared pool and take deals to the finish.</p><p>Generic CRMs don't model that handoff, so reps worked around the tool: statuses drifted, two reps called the same lead, callbacks were forgotten, and nobody trusted the numbers. I built them a CRM shaped exactly like their process instead.</p>`,
      },
      {
        num: "02",
        label: "Constraints",
        html: `<p>The system had to enforce the opener-to-closer handoff <b>at the database level</b>, not as a convention reps could bypass. It had to ingest large lead imports without creating duplicates, log calls without reps doing data entry, and run self-hosted — with security good enough that <b>nothing is reachable from the public internet</b>.</p>`,
      },
      {
        num: "03",
        label: "The system",
        html: `<p>A React + TypeScript front end (TanStack Query, Zustand, a Leaflet map picker) talks to a Node/Express API over a Postgres database (self-hosted Supabase), with a background worker for scheduled jobs. Three roles — BDR, AE, admin — see three different products on the same platform:</p><ul><li><b>BDRs</b> work only their own lead queue, move leads by logging call outcomes, and get callback reminders.</li><li><b>AEs</b> see their deals and a shared closers' pool they can claim from.</li><li><b>Admins</b> see everything: reassignment powers, revenue reports, quota tracking, and call recordings.</li></ul><p><b>Access is enforced in three layers</b> — React route guards, Express middleware, and Postgres row-level security on every table — so the same wall stops a UI bug and a crafted request alike. A lead's opener can never be silently overwritten: a database trigger blocks it except through an admin-only reassignment function. The activity log is append-only, with UPDATE and DELETE revoked at the database level, so history is evidence, not opinion.</p><p><b>Leads source themselves.</b> Admins pull real prospects straight from Google's Places API — filtered by rating, review count, cuisine, has-a-website and open-now, picked by city or a pin-and-radius on a map — with spreadsheet upload and a headless-browser scraper as alternates. Every source flows through one pipeline with a dry-run preview before commit, and re-runs skip anything already in the CRM, opt-outs included.</p><p><b>Imports don't create chaos.</b> Rows pass through normalization (phones stripped to digits, cities and states canonicalized) and fuzzy business-name matching — trigram similarity ≥ 0.45, corroborated by city or phone. An exact phone + email + name match merges automatically; everything ambiguous queues for human review with merge, edit, or discard.</p><p><b>Calls log themselves.</b> Each number is a one-tap Zoom deep link; when the call ends, Zoom's webhook logs it against the right lead — signature-verified (HMAC, constant-time) and <i>fail-closed</i> (a missing secret returns an error, never a silent pass), idempotent on the call id so retries are safe, and it auto-advances the stage. Call a lead already marked Won, Lost, or Do-Not-Contact and the rep gets a blocking decision modal — which quietly expires after 24 hours rather than guessing.</p>`,
      },
      {
        num: "04",
        label: "Decisions that mattered",
        html: `<div class="decision"><h4>Constraints live in the database, not the UI.</h4><p>Any client bug or clever user hits the same wall: immutable opener assignment, append-only audit history, role checks on every route. This is the difference between "the app usually behaves" and "the data can be trusted."</p></div><div class="decision"><h4>Zero-trust networking, portable across hosts.</h4><p>Nothing listens on a public port. All traffic enters through an outbound secure tunnel with TLS terminated at the edge; the database and admin studio are reachable only from the box itself or an SSH tunnel. Because ingress never depended on the host, it launched on owned hardware and later moved to a rented VPS — without re-architecture.</p></div><div class="decision"><h4>Owned the data layer down to the keys.</h4><p>The self-hosted Supabase originally booted from the vendor CLI — which hard-codes a public demo JWT secret. Once the database is reachable over a public tunnel, that demo key can forge a service-role token and walk straight past row-level security. I moved it onto a self-managed Docker Compose stack with a custom JWT secret, closing the hole without changing a single application URL.</p></div><div class="decision"><h4>Tests as the contract.</h4><p>96 automated tests cover services, authorization gates, and data migrations — which is what makes evolving a live system safe.</p></div>`,
      },
      {
        num: "05",
        label: "Results",
        html: `<p>The CRM runs a 35-agent team's day end to end: leads in, calls logged automatically, callbacks surfaced on time, deals tracked, and a leaderboard the team actually checks. Import capacity handles <b>3,000+ leads per day</b> with deduplication instead of chaos — over <b>100,000 leads processed</b> to date, each routed to an agent in <b>under a second</b>. Management reads revenue and quota from the system instead of asking around. And because it's self-hosted rather than per-seat SaaS, the marginal cost of each new seat is zero.</p>`,
      },
    ],
    stack: [
      "React", "TypeScript", "Vite", "TanStack Query", "Zod", "Node.js", "Express", "Helmet",
      "PostgreSQL (self-hosted Supabase)", "Row-Level Security", "DB triggers",
      "Google Places API", "Leaflet", "Zoom Phone webhooks (HMAC)", "Novu",
      "Cloudflare Tunnel", "systemd", "pg_dump + restic",
    ],
    proof: {
      layout: "wide",
      shots: [
        { src: "/work/crm/crm-01-admin-dashboard.png", cap: "Management dashboard — rep performance, pipeline funnel & revenue", w: 1920, h: 866 },
        { src: "/work/crm/crm-04-dedup-review-queue.png", cap: "Import review queue — fuzzy-match dedup with merge / edit / discard", w: 1920, h: 867 },
        { src: "/work/crm/crm-08-bdr-callbacks.png", cap: "BDR queue with callback reminders surfaced on time", w: 1920, h: 869 },
        { src: "/work/crm/crm-07-ae-pool-claim.png", cap: "AE shared pool — claim a qualified lead in one tap", w: 1920, h: 867 },
        { src: "/work/crm/crm-10-lead-detail-call.png", cap: "Lead workspace — click-to-call, stage and assignment", w: 1920, h: 862 },
        { src: "/work/crm/crm-11-lead-activity-log.png", cap: "Calls log themselves — an append-only activity trail", w: 1920, h: 868 },
        { src: "/work/crm/crm-02-leaderboard.png", cap: "Live leaderboard the team actually checks", w: 1920, h: 866 },
        { src: "/work/crm/crm-03-users-console.png", cap: "Admin console — roles, password reset, deactivate", w: 1920, h: 868 },
        { src: "/work/crm/crm-12-tests-passing.png", cap: "96 automated tests passing", w: 1920, h: 1020 },
        { src: "/work/crm/crm-13-ports-localhost-tunnel.png", cap: "Zero open ports — localhost-only bindings behind a secure tunnel", w: 1482, h: 762 },
        { src: "/work/crm/crm-14-backup-pg-dump.png", cap: "Boring, restorable operations — nightly automated backups", w: 1482, h: 762 },
      ],
    },
  },
  {
    slug: "app",
    index: "04",
    thumb: "/work/app/app-02-dashboard-multi-location.png",
    card: {
      title: "KROWDLY client app — iOS + Android",
      desc: "One app where a restaurant owner sees everything their agency does for them — and approves it in one tap. Built end to end in React Native.",
      tags: ["React Native", "Node · Postgres", "Push · deep links"],
    },
    cover: {
      kicker: "Case 03 — Cross-platform app",
      title: "A client app that makes an agency's work visible — and approvable in one tap",
      sub: "In production with 7 restaurants across 13 locations · iOS + Android from one codebase · nothing publishes without the owner's tap.",
    },
    meta: {
      client: "KROWDLY (my agency) · 7 restaurants",
      role: "Sole engineer — full stack",
      timeline: "2025–2026",
      focus: "Product, mobile, approvals",
    },
    sections: [
      {
        num: "01",
        label: "Problem",
        html: `<p>Marketing agencies are black boxes. The owner pays a retainer, work happens somewhere, and proof arrives as a monthly PDF — or as an email thread asking "can you approve this caption?" that sits unread for three days. For KROWDLY, a restaurant marketing agency running social, video, reputation, ads and campaigns for multi-location clients, everything bottlenecked on the owner. Email was the pipe, and email is where approvals go to die.</p><p>The brief I set myself: <b>one mobile app where an owner sees everything the agency is doing for them — and where everything that needs them is one push notification and one tap away.</b></p>`,
      },
      {
        num: "02",
        label: "Constraints",
        html: `<p>Restaurant owners are on their feet and on their phones: no passwords to remember, no training, no dashboard that needs a manual. Multi-location had to work from day one — per-location views and an all-locations rollup, not a login per store. And the app inherited a hard rule from the review-reply system that preceded it: the agency drafts, the client approves. The app had to <b>enforce that handoff, not politely suggest it.</b></p>`,
      },
      {
        num: "03",
        label: "The system",
        html: `<p>A React Native app (single codebase, iOS + Android) talks to a Node/Express API over Postgres (Supabase). Two audiences see two different products on the same platform.</p><p><b>The owner's app</b> opens on a live dashboard — interactions, views, and website clicks pulled from Meta's insights, filterable by location and date range. From there: a content calendar across Instagram, TikTok and Facebook; a Reviews Hub where every incoming review appears beside the reply drafted in the client's voice; plain-English monthly reports; campaign timelines with countdowns; and a lightweight "what we need from you" list.</p><p><b>The Approvals Center is the heart.</b> Offers, social posts, Reels (with inline video preview), and brand concepts all flow into one inbox. A push notification deep-links straight to the item; the owner approves, rejects, or requests changes with a comment — and every decision lands in an audit trail. The email approval process it replaced is gone.</p><p><b>The admin console</b> is the operator's side: push content into any client's calendar and approval queue, draft review replies, upload deliverables, advance project milestones, and manage every client account and location from one place.</p>`,
      },
      {
        num: "04",
        label: "Decisions that mattered",
        html: `<div class="decision"><h4>Approval as the product's spine, not a feature.</h4><p>Every service the agency sells terminates in the same primitive: a draft the client must approve before it goes public. One queue, one notification pattern, one audit trail — whether the item is a caption, a Reel, a review reply, or a logo. Owners learn the flow once and it covers the whole relationship.</p></div><div class="decision"><h4>Two-sided by design.</h4><p>The client app is only half the platform; the admin console is how a small team runs many clients without the app becoming a brochure. Onboarding a new restaurant is configuration — accounts, locations, brand voice — not code.</p></div><div class="decision"><h4>Plain English over dashboards.</h4><p>Reports narrate what happened and what it means, rather than re-exporting platform metrics the owner never asked to learn. The raw numbers stay available; the story leads.</p></div>`,
      },
      {
        num: "05",
        label: "Results",
        html: `<p>The platform runs KROWDLY's client relationships end to end — in production with <b>7 restaurants across 13 locations</b>, anchored by a multi-location New Jersey franchise. Metrics get checked in-app instead of asked over text, content is approved from a push notification instead of an email chain, and a reputation pipeline has already carried <b>310+ review replies</b> through draft, phone approval, and automatic posting. Approval turnaround dropped from days of email silence to same-day taps — and the owner can finally answer the question every agency client quietly asks: <i>what am I paying for?</i></p>`,
      },
    ],
    stack: [
      "React Native", "TypeScript", "Node.js", "Express", "PostgreSQL (Supabase)",
      "Push + deep links", "Magic-link auth", "Meta Graph API", "Integrated review-reply pipeline",
    ],
    proof: {
      layout: "phones",
      shots: [
        { src: "/work/app/app-02-dashboard-multi-location.png", cap: "Live multi-location dashboard", w: 804, h: 1750 },
        { src: "/work/app/app-03-approvals-center.png", cap: "Approvals Center — one inbox for everything", w: 804, h: 1750 },
        { src: "/work/app/app-04-approval-detail-offer.png", cap: "Approve an offer in one tap", w: 804, h: 1750 },
        { src: "/work/app/app-05-push-notification-lockscreen.png", cap: "Push notification → deep link", w: 804, h: 1750 },
        { src: "/work/app/app-07-reviews-hub.png", cap: "Reviews Hub — replies drafted in the owner's voice", w: 804, h: 1750 },
        { src: "/work/app/app-08-campaign-timeline.png", cap: "Campaign timeline with countdowns", w: 804, h: 1750 },
        { src: "/work/app/app-01-signin-magic-link.png", cap: "Magic-link sign-in — no passwords", w: 804, h: 1750 },
        { src: "/work/app/app-06-deeplink-approval-reel.png", cap: "Reel approval with inline preview", w: 804, h: 1750 },
        { src: "/work/app/app-09-story-push-to-approval-pair.png", cap: "Notification to approval, in two taps", w: 1888, h: 1890 },
      ],
    },
  },
];



export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export type Testimonials = Testimonial[];

export const site = {
  name: "Ahmed Ashraf",
  tagline: "Automation, built to stay running.",
  role: "AI automation engineer — LLM workflows, agents & integrations",
  email: "a7meda4raf12717@gmail.com",
  location: "Cairo, Egypt · Remote (UTC+2)",
  github: "https://github.com/ahmedashraf-eg",
  linkedin: "https://www.linkedin.com/in/ahmed-ashraf-a5651041b/",
  cv: "/ahmed-ashraf-cv.pdf",
  // Add real quotes here and the "What people say" section appears automatically on the home page.
  // e.g. { quote: "Ahmed shipped our CRM solo in weeks.", name: "J. Smith", role: "Sales lead, US team" }
  testimonials: [
    {
      quote:
        "He's an exceptional engineer. He is very knowledgeable in multiple aspects. He helped my clinic grow from 40-50 patients per week to 90-100 patients per week in just a few months. He handled building apps, ads, reception and marketing and he was good at all of it.",
      name: "Owner & lead dentist",
      role: "Bright Bite Dental Clinic, Cairo",
    },
  ] as Testimonial[],
};
