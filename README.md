<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="web/public/assets/wordmark-dark.png" />
  <img src="web/public/assets/wordmark-light.png" alt="Audit Doctor" width="480" />
</picture>

### Comprehensive Web Application Production Readiness Auditor & AI Agent Fixer Generator

**39 Readiness Standards** · **Health Score 0-100** · **AI Agent Directives** · Framework-aware for Next.js, React, Vite, Remix, Astro, Svelte & Vue.

<br/>

[![Website](https://img.shields.io/badge/Website-audit--doctor.vercel.app-000000?style=flat-square)](https://audit-doctor.vercel.app)
[![npm](https://img.shields.io/npm/v/audit-doctor?style=flat-square&label=audit-doctor&color=cb3837)](https://www.npmjs.com/package/audit-doctor)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[**Live Demo →**](https://audit-doctor.vercel.app) · [**NPM Package →**](https://www.npmjs.com/package/audit-doctor) · [**GitHub Repo →**](https://github.com/dqev/audit-doctor)

</div>

<br/>

<div align="center">
  <img src="web/public/assets/og.png" alt="Audit Doctor Banner" width="100%" />
</div>

<br/>

## Why Audit Doctor

Every production web application needs to meet essential standards for SEO, performance, accessibility, security, and user experience. `audit-doctor` automatically scans your project, calculates a 0-100 readiness score, and generates actionable AI agent directives so your AI tools can fix missing features automatically.

- **39 Production Standards:** Pages & Routing, SEO, Accessibility, UX, Performance, Security & Infra, Compliance, and Analytics.
- **Framework-Aware:** Native routing & component detection for Next.js (App & Pages), React, Vite, Remix, Astro, Svelte, and Vue.
- **AI Agent Directives:** Generates `AGENTS.md` and `.agents/skills/audit-fixer/SKILL.md` to instruct AI Coding Agents (Antigravity, Cursor, Claude Code, Windsurf) step-by-step.
- **CI/CD Ready:** Use `--score-only` or `--json` to enforce quality gates in GitHub Actions or Vercel deployments.
- **Zero Config:** Runs instantly using `npx audit-doctor .`.

<br/>

## Packages

| Package | Path | Latest | Install / Run |
| --- | --- | --- | --- |
| **CLI & Auditor Core** | [`audit-doctor`](audit-doctor) | [![npm](https://img.shields.io/npm/v/audit-doctor?style=flat-square&label=)](https://www.npmjs.com/package/audit-doctor) | `npx audit-doctor .` |
| **Web Showcase** | [`web`](web) | Live | [audit-doctor.vercel.app](https://audit-doctor.vercel.app) |

<br/>

## Quick Start

Run instantly in any web application directory:

```bash
npx audit-doctor .
```

### Options & Flags

```bash
# Scan current project and output terminal report
npx audit-doctor .

# Save Markdown report (AUDIT_REPORT.md)
npx audit-doctor . --report

# Generate AGENTS.md instruction prompt for AI Coding Agents
npx audit-doctor . --agent-prompt

# Generate Antigravity / Cursor Skill file (.agents/skills/audit-fixer/SKILL.md)
npx audit-doctor . --skill

# Filter audit by category ID (e.g., seo-metadata, security-infra)
npx audit-doctor . --category seo-metadata

# Output machine-readable JSON
npx audit-doctor . --json

# Output numeric health score only (0-100) for CI/CD gates
npx audit-doctor . --score-only
```

<br/>

## AI Agent Directives

`audit-doctor` generates step-by-step instructions for AI Coding Agents (Antigravity, Cursor, Claude Code, Windsurf) so they can automatically resolve failed audits:

```bash
# Generate AGENTS.md & Antigravity/Cursor Skill
npx audit-doctor . --agent-prompt --skill
```

Then tell your AI Agent:
> *"Read `AGENTS.md` and `.agents/skills/audit-fixer/SKILL.md`, then execute each task to bring the Audit Doctor score to 100."*

<br/>

## The 39 Audited Checklist Standards

| Category | Standard ID | Audit Description |
| --- | --- | --- |
| **🚦 Pages & Routing** | `custom-404` | Custom 404 Not Found page (`not-found.tsx` or `/404`) |
| | `custom-500` | Custom 500 / Error Boundary page (`error.tsx` or `/500`) |
| | `thank-you-page` | Post-submission confirmation page (`/thank-you`) |
| | `privacy-policy` | Data privacy policy route (`/privacy`) |
| | `terms-of-service` | Terms of service route (`/terms`) |
| | `empty-states` | Graceful zero-search & empty data UI components |
| **🔍 SEO & Metadata** | `meta-title` | Title tag configured on main routes |
| | `meta-description` | Search snippet description metadata |
| | `favicon-set` | Complete favicons (`favicon.ico`, `apple-touch-icon`, WebP/PNG) |
| | `robots-txt` | Search crawler directive file (`robots.txt`) |
| | `sitemap-xml` | XML sitemap file for engine indexing (`sitemap.xml`) |
| | `open-graph-image` | 1200x630 social preview card (`og:image`) |
| | `canonical-urls` | Canonical tag & metadataBase to prevent duplicate penalties |
| | `schema-org-jsonld` | Structured data tags (Organization / WebSite) |
| | `html-lang-attr` | HTML root `lang` attribute specified |
| **♿ Accessibility & Content** | `image-alt-text` | Alt tags present on all image elements |
| | `semantic-html` | Landmark elements (`<nav>`, `<main>`, `<header>`, `<footer>`) |
| | `accessibility-basics` | Keyboard focus ring, contrast, and ARIA attributes |
| | `print-stylesheet` | Print media stylesheet (`@media print`) |
| **📱 UX & Responsiveness** | `cta-above-fold` | Clear hero CTA button above the fold |
| | `sticky-mobile-cta` | Sticky bottom action bar on mobile viewports |
| | `mobile-responsive` | Viewport meta tag and mobile breakpoint styles |
| | `loading-states` | Skeleton boundaries and loading spinners (`loading.tsx`) |
| | `form-error-states` | Inline input validation feedback and error states |
| **🚀 Performance** | `compressed-images` | Modern WebP/AVIF image formats |
| | `lazy-loading-images` | Deferred loading for below-the-fold media |
| | `core-web-vitals` | Telemetry for LCP, CLS, and INP metrics |
| **🔒 Security & Infra** | `https-hsts-headers` | Strict-Transport-Security & security headers |
| | `secret-exposure-check` | No private keys exposed in public bundle variables |
| | `api-rate-limiting` | Middleware rate limiting on API endpoints |
| | `react-error-boundary` | Component-level runtime crash boundaries |
| | `db-backup-strategy` | Documented DB migration & rollback procedure |
| **⚖️ Compliance & Trust** | `cookie-banner` | Cookie consent notification UI |
| | `gdpr-ccpa-compliance` | User data export & deletion request handling |
| | `real-contact-address` | Physical address & official support email |
| | `email-spf-dkim` | Email DNS deliverability records (SPF/DKIM/DMARC) |
| | `unsubscribe-link` | Working unsubscribe link for email communications |
| **📊 Analytics & QA** | `analytics-installed` | Privacy-focused analytics (Vercel Analytics, PostHog, Plausible) |
| | `broken-link-check` | Pre-deploy link integrity checker script |

<br/>

## License

Released under the [MIT License](LICENSE).

<div align="center">
<br/>

Made with care by [dqev](https://github.com/dqev)

</div>
