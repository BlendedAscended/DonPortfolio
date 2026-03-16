# DonPortfolio — Deployment Guide
## sandeep.verbaflowllc.com → Hetzner + Cloudflare Tunnel

---

## Project Overview

- **Domain**: `sandeep.verbaflowllc.com`
- **Framework**: Next.js 16 (App Router)
- **Port on Hetzner**: `3001`
- **Deployment**: Hetzner Cx22 → PM2 → Cloudflare Tunnel
- **Environment Variables**: None required (static portfolio)
- **GitHub Actions**: Auto-deploys on push to `main`

---

## Pre-Deployment Checklist

### Step 1 — Initialize Git Repo

```bash
cd /Users/sandeep/Desktop/Project26/Agents/DonPortfolio/portfolio

git init
git add .
git commit -m "feat: initial portfolio commit"

# Create GitHub repo (replace with your username)
gh repo create donportfolio --private --source=. --remote=origin --push
# OR manually:
git remote add origin https://github.com/<YOUR_GH_USERNAME>/donportfolio.git
git push -u origin main
```

### Step 2 — Configure GitHub Secrets

In GitHub repo → Settings → Secrets and variables → Actions → **New repository secret**:

| Secret Name | Value |
|-------------|-------|
| `HETZNER_HOST` | Your Hetzner server IP |
| `HETZNER_USER` | `claw` |
| `HETZNER_SSH_KEY` | Contents of your **private** SSH key (Ed25519) |
| `HETZNER_PORT` | `22` |

> **How to get SSH key content:**
> ```bash
> cat ~/.ssh/id_ed25519   # Copy this entire output including headers
> ```
> If you don't have an Ed25519 key:
> ```bash
> ssh-keygen -t ed25519 -C "github-actions-deploy"
> # Add public key to Hetzner server:
> ssh-copy-id -i ~/.ssh/id_ed25519.pub claw@<HETZNER_IP>
> ```

### Step 3 — First Deploy on Hetzner

SSH into Hetzner and clone the repo:
```bash
ssh claw@<HETZNER_IP>

mkdir -p /var/www/portfolio
cd /var/www/portfolio

# Clone (use HTTPS or SSH depending on your setup)
git clone https://github.com/<YOUR_GH_USERNAME>/donportfolio.git .

# Install and build
npm ci
npm run build

# Start with PM2 (using ecosystem config)
pm2 start ecosystem.config.js --only portfolio
pm2 save

# Verify it's running
curl http://localhost:3001
```

### Step 4 — Cloudflare Tunnel DNS Record

On your Hetzner server (already authenticated via `cloudflared tunnel login`):

```bash
# Add sandeep subdomain to existing tunnel
cloudflared tunnel route dns verbaflow-main sandeep.verbaflowllc.com
```

This creates:
```
CNAME  sandeep  →  <TUNNEL_ID>.cfargotunnel.com  (Proxied)
```

And update `~/.cloudflared/config.yml` to include:
```yaml
  - hostname: sandeep.verbaflowllc.com
    service: http://localhost:3001
    originRequest:
      noTLSVerify: true
```

Then restart tunnel:
```bash
sudo systemctl restart cloudflared
```

---

## next.config.ts — Production Hardening

Update `next.config.ts` before deploying:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable standalone output for smaller Docker/PM2 footprint
  output: 'standalone',

  // Performance
  compress: true,

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Image optimization (add if using next/image)
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
```

---

## PM2 Config (`ecosystem.config.js`)

Already in this repo. Port is `3001`, 2 cluster instances.

```bash
# Start
pm2 start ecosystem.config.js

# Reload (zero-downtime)
pm2 reload portfolio

# Logs
pm2 logs portfolio --lines 100

# Status
pm2 show portfolio
```

---

## CI/CD Flow

```
You push to main
    │
    ▼
GitHub Actions (.github/workflows/deploy.yml)
    │
    ├── SSH into Hetzner (claw@<IP>)
    ├── git pull origin main
    ├── npm ci && npm run build
    ├── pm2 reload portfolio
    └── Health check on :3001
```

---

## Environment Variables

**None required.** This is a static portfolio with no backend.

If you add Sanity, analytics, or contact form later, add to `.env.local`:
```bash
# Future additions (not needed now)
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
# RESEND_API_KEY=re_xxxx
# NEXT_PUBLIC_SANITY_PROJECT_ID=xxxx
```

---

## DNS Verification

After deployment, check:
```bash
# From local machine
dig sandeep.verbaflowllc.com
# Should return CNAME → <tunnel-id>.cfargotunnel.com

# From Hetzner
curl -I https://sandeep.verbaflowllc.com
# Should return HTTP/2 200
```

---

## Monitoring & Logs

```bash
# On Hetzner
pm2 logs portfolio               # Live logs
pm2 logs portfolio --lines 200   # Last 200 lines
pm2 monit                        # Live dashboard
htop                             # System resources
```

---

## Sanity Integration (Future)

If you add Sanity CMS for blog/content to the portfolio:

1. Create project at [sanity.io](https://sanity.io)
2. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=<new-project-id>
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   ```
3. Add to GitHub Secrets so CI/CD includes it in build
4. Consider: **separate Sanity project** from verbaflowllc (different content space)
