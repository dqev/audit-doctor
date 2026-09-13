#!/usr/bin/env bash
# Audit Doctor AI Coding Agent Skill Installer
set -e

echo "📦 Installing Audit Doctor Production Readiness Skill for AI Coding Agents..."

SKILL_NAME="audit-doctor"
TARGET_DIR="$HOME/.gemini/antigravity-ide/builtin/skills/$SKILL_NAME"
mkdir -p "$TARGET_DIR"

cat << 'EOF' > "$TARGET_DIR/SKILL.md"
---
name: audit-doctor
description: Audit modern web applications across 39 production readiness standards and fix failed audits automatically.
---

# Audit Doctor Rules & Remediation

1. Custom 404 & 500 Pages: Create `app/not-found.tsx` or `pages/404.tsx` and `app/error.tsx` or `pages/500.tsx`.
2. Legal Policy Pages: Include Privacy Policy (`/privacy`), Terms of Service (`/terms`), and post-submit Thank You confirmation pages (`/thank-you`).
3. SEO & Metadata: Export `metadata.title` and `metadata.description` or `<meta>` tags. Include complete favicons, `robots.txt`, `sitemap.xml`, and 1200x630 Open Graph preview image.
4. Accessibility: Provide descriptive `alt` attributes on all images, focus ring states (`focus-visible`), and semantic HTML tags (`<nav>`, `<main>`, `<header>`, `<footer>`).
5. UX & Responsiveness: Place hero CTA above the fold, sticky bottom mobile CTA bar, skeleton loading boundaries (`loading.tsx`), and inline form error feedback.
6. Performance: Serve WebP/AVIF compressed images, lazy load below-fold media, and instrument Core Web Vitals (`@vercel/speed-insights` or `web-vitals`).
7. Security & Compliance: Enforce HSTS security headers, prevent backend secrets from using public environment prefixes, implement rate limiting, and include a Cookie Consent banner.
EOF

echo "✅ Installed Audit Doctor skill successfully!"
