# Prompt 04 — DonPortfolio Migration Analysis

> Generated: 2026-03-16
> Purpose: Capture project snapshot for .env.example, PM2 config, GitHub Actions CI/CD, and Hetzner deployment.

---

## Step 1 — Project Analysis Output

### 1. Full File Tree (3 levels deep)

```
/Users/sandeep/Desktop/Project26/Agents/DonPortfolio/portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .next/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── favicon.ico
│   ├── components/
│   │   ├── domains/
│   │   │   └── DomainMatrix.tsx
│   │   ├── footer/
│   │   │   └── Footer.tsx
│   │   ├── hero/
│   │   │   ├── HeroSection.tsx
│   │   │   └── AIChatSimulation.tsx
│   │   ├── metrics/
│   │   │   └── MetricsBanner.tsx
│   │   ├── navigation/
│   │   │   └── Navbar.tsx
│   │   ├── projects/
│   │   │   └── ProjectGrid.tsx
│   │   ├── timeline/
│   │   │   └── ExperienceTimeline.tsx
│   │   └── ui/
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── SectionHeading.tsx
│   ├── data/
│   │   ├── domains.ts
│   │   ├── metrics.ts
│   │   └── timeline.ts
│   └── lib/
│       └── utils.ts
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
├── ecosystem.config.js
├── DEPLOYMENT.md
├── README.md
└── .gitignore
```

---

### 2. package.json

**Core dependencies:**
- `next`: 16.1.6
- `react`: 19.2.3 / `react-dom`: 19.2.3
- `framer-motion`: ^12.36.0
- `lucide-react`: ^0.577.0
- `@radix-ui/react-slot`: ^1.2.4
- `tailwind-merge`: ^3.5.0 / `clsx`: ^2.1.1

**Dev dependencies:**
- `typescript`: ^5, `tailwindcss`: ^4, `eslint`: ^9

**Scripts:**
```json
{
  "dev":   "next dev",
  "build": "next build",
  "start": "next start",
  "lint":  "eslint"
}
```

---

### 3. next.config.ts

Currently minimal (no custom options). Recommended production additions documented in `DEPLOYMENT.md`:
- `output: 'standalone'`
- `compress: true`
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- `images: { formats: ['image/avif', 'image/webp'] }`

---

### 4. Environment Variables

**Current status: None required.** The portfolio is fully static with no external API calls.

**Optional future variables:**

| Variable | Purpose | When to add |
|----------|---------|-------------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics | If adding analytics |
| `RESEND_API_KEY` | Contact form emails | If adding contact form |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity CMS | If adding blog/content |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity CMS | If adding blog/content |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity CMS | If adding blog/content |

**No `.env` files exist** — none needed for current build.

---

### 5. Dev Server Port

- **Development:** `3000` (Next.js default)
- **Production:** `3001` (set in `ecosystem.config.js`)

---

### 6. Build Command & Output

```bash
npm run build    # Output: .next/
```

Production install: `npm ci --prefer-offline --omit=dev`

---

### 7. Deployment Configuration

**Stack:** PM2 (cluster, 2 instances) + Hetzner Cx22 + Cloudflare Tunnel

- `ecosystem.config.js` — PM2 config, port 3001, `/var/www/portfolio`
- `.github/workflows/deploy.yml` — SSH deploy on push to `main`
- **No Vercel, no Docker**

**GitHub Secrets required:**
| Secret | Value |
|--------|-------|
| `HETZNER_HOST` | Server IP |
| `HETZNER_USER` | `claw` |
| `HETZNER_SSH_KEY` | Ed25519 private key |
| `HETZNER_PORT` | `22` |

---

### 8. External APIs & Services

**None.** Static portfolio — no Sanity, Stripe, Supabase, or other integrations.

Contact links are static (`mailto:`, `https://linkedin.com/in/sandeepghotra`).

---

### 9. Font Loading Strategy

`next/font/google` (auto-optimized, no external requests at runtime):

```typescript
import { Geist, Geist_Mono, Inter } from "next/font/google";
```

CSS variables: `--font-inter`, `--font-geist`, `--font-geist-mono`

---

### 10. Router Type

**App Router** (`src/app/` directory, `layout.tsx` + `page.tsx`). No `pages/` directory.

---

## Step 2 — Create .env.example

**Actual env var keys used in codebase:** None (static portfolio).

The `.env.example` file has been created at `portfolio/.env.example` with commented-out optional future variables:

```bash
# DonPortfolio — Environment Variables
# No variables required for current static build.
# Uncomment and fill in when adding these features:

# Google Analytics
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Contact form email (Resend)
# RESEND_API_KEY=re_xxxx

# Sanity CMS (future blog/content)
# NEXT_PUBLIC_SANITY_PROJECT_ID=xxxx
# NEXT_PUBLIC_SANITY_DATASET=production
# NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

---

## Step 3 — PM2 Configuration

Already configured in `portfolio/ecosystem.config.js`:
- Port: `3001`
- Instances: `2` (cluster mode)
- Deploy path: `/var/www/portfolio`
- Memory limit: `512M`
- Zero-downtime: `wait_ready: true`

No changes needed.

---

## Step 4 — GitHub Actions CI/CD

Already configured in `portfolio/.github/workflows/deploy.yml`:
- Triggers on push to `main`
- SSHes into Hetzner, runs `git pull + npm ci + npm build + pm2 reload`
- Health checks port `3001` after deploy

No changes needed. Just add the 4 GitHub Secrets listed above.

---

## Step 5 — Hetzner Deployment

See `portfolio/DEPLOYMENT.md` for full step-by-step instructions:
1. Push repo to GitHub
2. Add GitHub Secrets
3. SSH into Hetzner → clone to `/var/www/portfolio` → `pm2 start ecosystem.config.js`
4. Add Cloudflare Tunnel route: `sandeep.veldonlab.com → localhost:3001`

---

## Deployment Readiness Summary

| Item | Status | Notes |
|------|--------|-------|
| App Router | ✓ | `src/app/` |
| Fonts | ✓ | `next/font/google` |
| Env vars | ✓ | None required |
| Build | ✓ | `npm run build` |
| PM2 config | ✓ | Port 3001, cluster mode |
| GitHub Actions | ✓ | Auto-deploy on `main` |
| `.env.example` | ✓ | Created with optional vars |
| Cloudflare Tunnel | Pending | Manual step on Hetzner |
