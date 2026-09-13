# 🏥 Audit Doctor (`audit-doctor`)

> **Comprehensive Web Application Production Readiness Auditor & AI Agent Directive Generator**

`audit-doctor` automatically audits Next.js (App & Pages Router), React, Vite, Remix, Astro, Svelte, Vue, and static web applications against **39 essential production-readiness standards**.

It computes a **Health Score (0-100)**, generates detailed **Markdown Reports** (`AUDIT_REPORT.md`), and creates **AI Agent Fix Blueprints** (`AGENTS.md` and `.agents/skills/audit-fixer/SKILL.md`) that command AI Coding Agents (Antigravity, Cursor, Claude Code, Windsurf) to fix all missing pages, components, meta tags, and security configurations step-by-step.

---

## ⚡ Quick Start

Run instantly in any codebase using `npx`:

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

---

## 📋 The 39 Audited Checklist Standards

### 1. 🚦 Pages & Routing
1. **Custom 404 Page**: Proper HTTP 404 status (`app/not-found.tsx` or `pages/404.tsx`).
2. **Custom 500 / Error Boundary Page**: Server crash fallback page (`app/error.tsx` or `pages/500.tsx`).
3. **Thank You Page**: Post-form submission confirmation route (`/thank-you`).
4. **Privacy Policy Page**: Legal data privacy disclosures page (`/privacy`).
5. **Terms & Conditions Page**: Terms of service page (`/terms`).
6. **Empty States UI**: Handles zero-search results and empty data gracefully.

### 2. 🔍 SEO & Metadata
7. **Meta Title**: Meta title configured on every route.
8. **Meta Description**: Descriptive snippet metadata for search engines.
9. **Favicon Set**: Complete icons (`favicon.ico`, `apple-touch-icon.png`, `icon.svg`).
10. **robots.txt**: Search crawler directive file (`public/robots.txt` or `app/robots.ts`).
11. **sitemap.xml**: XML sitemap generator file for crawler indexing.
12. **Open Graph Image**: 1200x630 social card preview image (`og:image`).
13. **Canonical URLs**: `metadataBase` & canonical links to prevent duplicate penalties.
14. **Schema.org / JSON-LD**: Rich structured data tags (Organization, WebSite).
15. **HTML lang Attribute**: Explicit language code (`<html lang="en">`).

### 3. ♿ Accessibility & Content
16. **Image Alt Text**: Alt description on all `<img>` and `<Image>` elements.
17. **Semantic HTML**: Landmark tags (`<nav>`, `<main>`, `<header>`, `<footer>`).
18. **Accessibility Basics**: Contrast ratios, keyboard focus rings (`focus-visible`), and ARIA labels.
19. **Print Stylesheet**: `@media print` rules hiding unnecessary menus when printed.

### 4. 📱 UX & Responsiveness
20. **CTA Above the Fold**: Primary call-to-action button visible in hero view.
21. **Sticky Mobile CTA**: Mobile sticky bottom action bar.
22. **Mobile Breakpoints**: Viewport meta tag and responsive media queries.
23. **Loading States**: Skeleton loading boundaries (`app/loading.tsx`).
24. **Form Error States**: Inline input validation feedback and error states.

### 5. 🚀 Performance
25. **Compressed Images**: Modern WebP/AVIF formats via Next.js `<Image>`.
26. **Lazy Loading Below Fold**: Deferred loading for below-fold media.
27. **Core Web Vitals**: Instrumenting LCP, CLS, and INP metrics (`@vercel/speed-insights`).

### 6. 🔒 Security & Infra
28. **HTTPS & HSTS Headers**: Strict-Transport-Security and security headers.
29. **Secret Exposure Check**: Prevention of backend private keys prefixed with `NEXT_PUBLIC_`.
30. **API Rate Limiting**: Abuse protection middleware on API/form endpoints.
31. **React Error Boundaries**: Component level error isolation.
32. **Database Backup Strategy**: Documented DB migration rollback and snapshot policy.

### 7. ⚖️ Compliance & Trust
33. **Cookie Banner**: Explicit cookie consent banner.
34. **GDPR / CCPA Compliance**: Data subject export & deletion request handling.
35. **Real Contact Address**: Physical address and official support email.
36. **Email SPF/DKIM/DMARC**: Transactional email DNS deliverability records.
37. **Working Unsubscribe Link**: Opt-out link for newsletter subscribers.

### 8. 📊 Analytics & QA
38. **Analytics Installed**: Privacy-friendly telemetry SDK (Vercel Analytics, Plausible, PostHog).
39. **Broken Link Check**: Pre-deploy link integrity checker script.

---

## 🤖 Commanding AI Agents to Fix Audits

`audit-doctor` generates step-by-step AI directives so AI Coding Agents can fix failed audits automatically:

```bash
# Generate AGENTS.md in your project
npx audit-doctor . --agent-prompt --skill
```

Then tell your AI Agent (Antigravity, Cursor, Claude):
> *"Read `AGENTS.md` and `.agents/skills/audit-fixer/SKILL.md`, then execute each task to bring the Audit Doctor score to 100."*

---

## 📦 Programmatic Usage (Node.js API)

```typescript
import { runAuditScan } from 'audit-doctor';

const result = await runAuditScan({
  cwd: './my-app',
  generateReport: true,
  generateAgentPrompt: true,
});

console.log(`Health Score: ${result.scoreResult.overallScore}/100`);
console.log(`Grade: ${result.scoreResult.grade}`);
```

---

## 📄 License
MIT © [dqev](https://github.com/dqev)
