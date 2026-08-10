# Push to GitHub — one command block

Everything on GitHub's side is already done:

- Username changed to **ahmedashraf-eg**
- Repo created: **https://github.com/ahmedashraf-eg/ahmedashraf-eg.github.io** (public, empty)
- Pages source set to **GitHub Actions**
- Workflow, config and `.nojekyll` are all in your local folder

The only step left is the push, which needs a terminal.

---

## Paste this into PowerShell

```powershell
cd "C:\Users\Ahmed\Desktop\Freelance GIG\Portfolio\portfolio-site"

git init
git branch -M main
git add .
git commit -m "Portfolio site: four production case studies, statically exported"
git remote add origin https://github.com/ahmedashraf-eg/ahmedashraf-eg.github.io.git
git push -u origin main
```

**On the sign-in.** A browser window opens for GitHub authorisation — approve it and the
push continues. If you instead get a username/password prompt in the terminal, that's the
old credential helper: a password won't work there. Install **Git Credential Manager**
(it ships with Git for Windows) or generate a personal access token and paste that as the
password.

**If git says `'git' is not recognized`** — install Git for Windows from
https://git-scm.com/download/win, reopen PowerShell, and run the block again.

---

## What happens next, on its own

The push triggers the workflow. Watch it at:

**https://github.com/ahmedashraf-eg/ahmedashraf-eg.github.io/actions**

Two jobs — *build* then *deploy* — about two minutes total. When they go green:

# https://ahmedashraf-eg.github.io

Send me that URL and I'll go over the live site.

---

## After the first deploy

Every push redeploys. No dashboard, no CLI:

```powershell
git add .
git commit -m "what changed"
git push
```

---

## Already wired for you

- **GitHub link is back on the portfolio**, pointing at your real profile, and it's in the
  structured data alongside your LinkedIn.
- **Canonical, Open Graph and structured-data URLs** now resolve to
  `https://ahmedashraf-eg.github.io` in production builds and `localhost` in dev.
- If you buy a domain later, set `NEXT_PUBLIC_SITE_URL` to it and add it under
  **Settings → Pages → Custom domain**. Nothing else needs editing.

## If the site deploys but looks unstyled

That means `public/.nojekyll` didn't make it into the commit. GitHub Pages runs Jekyll by
default, and Jekyll deletes folders beginning with an underscore — including Next's
`_next/`, which holds every stylesheet and script. Check with:

```powershell
git ls-files public/.nojekyll
```

If that prints nothing, run `git add -f public/.nojekyll`, commit, and push again.
