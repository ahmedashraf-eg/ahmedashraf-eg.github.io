# Portfolio — Launch Checklist (remaining edits)

Tier 3 and all nice-to-haves are **done and running locally**. This covers the
remaining **Tier 1 (critical)** and **Tier 2 (high-impact)** items from the review,
split by who does what.

---

## A. Done ✓ — shipped locally (refresh http://localhost:3000 to see them)

- [x] **CV PDF download** — `Download CV` button in the hero + a `Résumé (PDF)` link in the contact block. Uses your "Updated" CV; swap the file at `public/ahmed-ashraf-cv.pdf` anytime.
- [x] **Thumbnails on the 3 homepage work rows** — each case row now shows a screenshot (hidden on small screens for a clean mobile list).
- [x] **Reframe Case 02 as automation** — retitled **"AI review-reply automation,"** now leads with the five-step pipeline (watcher → webhook → FastAPI → LLM in JSON mode → human approval → auto-publish); section renamed "The pipeline." _(Kept truthful: the drafting LLM is provider-swappable, not specifically Claude — your general Claude API / MCP work stays in the About section + schema.)_
- [x] **Testimonial block (scaffold)** — a "What people say" section that appears automatically once you add quotes to `site.testimonials` in `lib/caseStudies.ts`. Empty for now, so no placeholder quotes show.
- [x] **Live-link buttons (scaffold)** — optional per-case `live` links render in the case-study cover when set. Add e.g. `live: [{ label: "App Store", href: "https://…" }]` to a case in `lib/caseStudies.ts`.

## B. Needs your action — then I wire it in

- [ ] **Custom domain + professional email** _(Tier 1 — biggest credibility fix)_. Buy a domain (e.g. `ahmedashraf.dev`), then tell me the domain + the email you want (e.g. `ahmed@ahmedashraf.dev`). → I update the site config + metadata and we deploy there. _(Right now the main CTA is a Gmail with random digits.)_
- [ ] **One clickable, live product** _(Tier 1)_. Send me any of: an App Store / Play Store link for the KROWDLY app · a 30–60s screen recording of the CRM or review system (I can turn a video into a clean GIF) · public GitHub repo links. → I embed / link them.
- [ ] **GitHub + LinkedIn** _(Tier 1)_. Confirm your real handles and that both profiles look populated (a sparse GitHub hurts more than none for full-stack roles). → I set the exact URLs (currently placeholder `ahmedashraf-dev`).
- [ ] **Testimonial quote(s)** _(Tier 2)_. One or two lines from the sales-team lead or a KROWDLY client, with a name/role (even "Owner, multi-location NJ restaurant franchise"). → I place them in the scaffolded block.
- [ ] **A second AI / automation exhibit** _(Tier 2)_. Even a small MCP connector or agent workflow — a few sentences + any screenshots. → I build the case card + page in the same template, so 2 of the exhibits are AI, not 1.

---

## Already shipped (Tier 3 + nice-to-have)

- [x] Copy-email button (with mailto fallback)
- [x] Favicon + OG / Twitter share card + canonical tags
- [x] Contrast bump (`#595959`) + 11px labels
- [x] Mobile single-column reflow
- [x] Availability + timezone pill in the hero
- [x] "How I work" section (3 principles)
- [x] JSON-LD `Person` schema
- [x] Unique per-page meta descriptions

---

**Fastest path to "publishable":** the domain + email (B1) and one clickable proof (B2).
Section A is done — the remaining blockers are all in **Section B**, which need your accounts / decisions.
