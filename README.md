# Ahmed Ashraf — Portfolio

Full-stack developer — web, mobile & AI. Cairo, remote.

A Next.js 14 portfolio (App Router, TypeScript, statically exported) presenting four
production systems: a 35-agent sales CRM, an AI review-reply pipeline, a React Native
client app, and a dental practice platform.

**Live:** deployed from `main` to GitHub Pages on every push.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # static export → ./out
npx serve out      # preview the exported site
```

Node 20+ recommended.

## How it's built

- **Next.js 14** App Router, `output: "export"` — every page is prerendered, so the
  whole site is static files with no server.
- **TypeScript**, strict.
- **No CSS framework.** One hand-written stylesheet (`app/globals.css`) implementing a
  black-and-white design system: Manrope, hairline rules, 2px radii, weight contrast
  instead of colour.
- **Self-hosted font.** The variable Manrope file ships in `app/fonts/`, so builds don't
  depend on Google Fonts being reachable and visitors make no third-party request.
- **Zero runtime dependencies** beyond React and Next.

## Layout

```
app/
  layout.tsx              root layout, metadata, self-hosted font
  page.tsx                home — hero, stats, work index, about, contact
  work/[slug]/page.tsx    case-study template
  globals.css             the entire design system
  fonts/                  Manrope variable subset
components/
  Lightbox.tsx            shared full-screen image viewer (keyboard + touch)
  ProofGallery.tsx        case-study proof grid
  ZoomImage.tsx           a single expandable image
  Header.tsx  Footer.tsx  CopyEmail.tsx
lib/
  caseStudies.ts          all content — copy, stacks, image manifests
public/work/              proof screenshots, per case
```

All content lives in `lib/caseStudies.ts`. Adding a case study means adding one object;
the index page, the route, the metadata and the gallery all follow from it.

## Notes worth knowing

- **Images carry explicit dimensions.** Every entry in `caseStudies.ts` records its
  intrinsic width and height, so the browser reserves each box before the file arrives
  and the page doesn't reflow while a gallery streams in.
- **`public/.nojekyll`** is required — GitHub Pages runs Jekyll by default, which
  silently drops the `_next/` directory and would serve an unstyled site.
- **`trailingSlash: true`** makes the export emit `work/clinic/index.html`, so clean URLs
  resolve on a static host.
- **`NEXT_PUBLIC_SITE_URL`** sets the canonical, Open Graph and structured-data URLs.
  Unset, it falls back to the deployment URL.

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes to
GitHub Pages. One-time setup: **Settings → Pages → Source → GitHub Actions**.

---

© Ahmed Ashraf. Code is MIT; the written case studies, screenshots and CV are not
licensed for reuse.
