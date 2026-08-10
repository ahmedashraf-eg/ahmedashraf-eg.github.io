# Deploy — Ahmed Ashraf portfolio

Everything is ready. The build is verified clean (11 static pages, 4 case studies).
You run the deploy yourself because Vercel's API is not reachable from Claude's sandbox.

## First deploy (about 3 minutes)

Open **PowerShell** and run:

```powershell
cd "C:\Users\Ahmed\Desktop\Freelance GIG\Portfolio\portfolio-site"
npm install
npx vercel login
npx vercel --prod
```

- `npx vercel login` — pick **Continue with GitHub** or **Continue with Email**. If you use
  email, Vercel sends you a confirmation link; click it and the terminal continues on its own.
  This also creates your Vercel account if you don't have one. Free, no card.
- `npx vercel --prod` — answers: *Set up and deploy?* **Y** · *Which scope?* your own account ·
  *Link to existing project?* **N** · *Project name?* `ahmed-ashraf` (or anything) ·
  *In which directory is your code?* **./** (just press Enter) ·
  *Want to modify build settings?* **N** — it auto-detects Next.js.

You'll get a URL like `https://ahmed-ashraf.vercel.app`. Send it to me and I'll check it over.

## Re-deploying after any edit

```powershell
cd "C:\Users\Ahmed\Desktop\Freelance GIG\Portfolio\portfolio-site"
npx vercel --prod
```

## When you buy a domain

1. Vercel dashboard → your project → **Settings → Domains** → add it, follow the DNS steps.
2. Same page → **Settings → Environment Variables** → add:

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` |

3. Redeploy. That one variable drives the canonical tags, the Open Graph URL, and the
   structured-data URL — nothing else needs editing.

Until you set it, those tags fall back to the Vercel production URL automatically.

## Notes

- Next.js was bumped **14.2.15 → 14.2.35** to clear a known security advisory. Run
  `npm install` once (above) so your local `node_modules` matches.
- Two remaining `npm audit` warnings are in `postcss`, a build-time-only dependency of
  Next 14. Clearing them requires upgrading to Next 16 — a breaking change, not worth it
  for a static site.
- Fonts are fetched from Google Fonts at **build** time on Vercel's servers, not at page
  load, so visitors get them self-hosted from your own domain.
