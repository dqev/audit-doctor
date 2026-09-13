import { RuleDefinition } from './types.js';
import { RULE_IDS } from './rule-ids.js';

export const ALL_RULES: Record<string, RuleDefinition> = {
  [RULE_IDS.CUSTOM_404]: {
    id: RULE_IDS.CUSTOM_404,
    number: 1,
    categoryId: 'pages-routing',
    title: 'Custom 404 Page (Proper HTTP 404 status)',
    description: 'Ensure a custom 404 Not Found page exists returning HTTP 404 status code (e.g. app/not-found.tsx or pages/404.tsx).',
    severity: 'error',
    weight: 3,
    fixBlueprint: {
      title: 'Create Custom 404 Page',
      targetFiles: ['app/not-found.tsx', 'pages/404.tsx', 'src/pages/404.jsx'],
      summary: 'Create a helpful 404 error page with clear navigation links back to home.',
      steps: [
        'Create file `app/not-found.tsx` (for Next.js App Router) or `pages/404.tsx` (for Pages Router / Vite).',
        'Include a main heading "404 - Page Not Found", helpful explanation, and a prominent call-to-action button linking back to home (`/`).',
        'Ensure server response returns HTTP 404 status.',
      ],
      codeTemplate: `// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </main>
  );
}`,
    },
  },

  [RULE_IDS.CUSTOM_500]: {
    id: RULE_IDS.CUSTOM_500,
    number: 2,
    categoryId: 'pages-routing',
    title: 'Custom 500 / Server Error Page',
    description: 'Provide a custom 500 server error boundary page (app/error.tsx, app/global-error.tsx or pages/500.tsx).',
    severity: 'error',
    weight: 3,
    fixBlueprint: {
      title: 'Create Custom 500 / Error Page',
      targetFiles: ['app/error.tsx', 'app/global-error.tsx', 'pages/500.tsx'],
      summary: 'Create a client error boundary page to catch unhandled server errors gracefully.',
      steps: [
        'Create `app/error.tsx` (App Router client component with `reset` handler) or `pages/500.tsx`.',
        'Provide a "Try Again" button calling `reset()` and contact support link.',
      ],
      codeTemplate: `'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p className="text-gray-600 mb-6">An unexpected error occurred on our server.</p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700"
      >
        Try Again
      </button>
    </div>
  );
}`,
    },
  },

  [RULE_IDS.THANK_YOU_PAGE]: {
    id: RULE_IDS.THANK_YOU_PAGE,
    number: 3,
    categoryId: 'pages-routing',
    title: 'Thank You Page (Post-Form Submit)',
    description: 'Ensure a dedicated Thank You or confirmation route exists for conversion tracking and post-submission UX.',
    severity: 'warning',
    weight: 2,
    fixBlueprint: {
      title: 'Create Thank You Confirmation Page',
      targetFiles: ['app/thank-you/page.tsx', 'pages/thank-you.tsx'],
      summary: 'Create a post-submission confirmation page that displays success messaging and next steps.',
      steps: [
        'Create route `app/thank-you/page.tsx` or `pages/thank-you.tsx`.',
        'Add conversion event trigger hooks if analytics are active.',
        'Direct form handlers to redirect to `/thank-you` upon successful submission.',
      ],
      codeTemplate: `export default function ThankYouPage() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-4 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
      <p className="text-lg text-gray-600 mb-8">
        We have received your submission and will get back to you shortly.
      </p>
    </main>
  );
}`,
    },
  },

  [RULE_IDS.PRIVACY_POLICY]: {
    id: RULE_IDS.PRIVACY_POLICY,
    number: 4,
    categoryId: 'pages-routing',
    title: 'Privacy Policy Page',
    description: 'Ensure a Privacy Policy page exists (/privacy or /privacy-policy) for legal compliance.',
    severity: 'error',
    weight: 3,
    fixBlueprint: {
      title: 'Create Privacy Policy Page',
      targetFiles: ['app/privacy/page.tsx', 'pages/privacy.tsx'],
      summary: 'Create a legal Privacy Policy page describing data collection, cookies, and user privacy rights.',
      steps: [
        'Create route `app/privacy/page.tsx` or `pages/privacy.tsx`.',
        'Outline data processing practices, third-party trackers, user rights (GDPR/CCPA), and contact email.',
        'Link to `/privacy` from the website footer.',
      ],
    },
  },

  [RULE_IDS.TERMS_CONDITIONS]: {
    id: RULE_IDS.TERMS_CONDITIONS,
    number: 5,
    categoryId: 'pages-routing',
    title: 'Terms & Conditions Page',
    description: 'Ensure a Terms & Conditions / Terms of Service page exists (/terms or /terms-and-conditions).',
    severity: 'error',
    weight: 3,
    fixBlueprint: {
      title: 'Create Terms & Conditions Page',
      targetFiles: ['app/terms/page.tsx', 'pages/terms.tsx'],
      summary: 'Create a Terms of Service page establishing service usage conditions.',
      steps: [
        'Create route `app/terms/page.tsx` or `pages/terms.tsx`.',
        'Add terms covering account liability, usage rules, IP rights, and governing jurisdiction.',
        'Link to `/terms` in footer.',
      ],
    },
  },

  [RULE_IDS.EMPTY_STATES]: {
    id: RULE_IDS.EMPTY_STATES,
    number: 6,
    categoryId: 'pages-routing',
    title: 'Empty States UI Components',
    description: 'Ensure lists, search results, and dashboards handle empty data states gracefully with actionable UI.',
    severity: 'warning',
    weight: 2,
    fixBlueprint: {
      title: 'Implement Empty State Components',
      targetFiles: ['components/empty-state.tsx', 'src/components/EmptyState.jsx'],
      summary: 'Build reusable empty state UI for missing search results or zero items.',
      steps: [
        'Create `components/empty-state.tsx` with an icon, title ("No results found"), description, and reset button.',
        'Integrate in search, dashboard, and list views when item counts equal 0.',
      ],
      codeTemplate: `export function EmptyState({ title = "No results found", message = "Try adjusting your search terms or filters.", onReset }: { title?: string; message?: string; onReset?: () => void }) {
  return (
    <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-lg p-6">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{message}</p>
      {onReset && (
        <button onClick={onReset} className="mt-4 px-4 py-2 text-sm bg-gray-900 text-white rounded-md">Reset Filters</button>
      )}
    </div>
  );
}`,
    },
  },

  [RULE_IDS.META_TITLE]: {
    id: RULE_IDS.META_TITLE,
    number: 7,
    categoryId: 'seo-metadata',
    title: 'Meta Title on Every Page',
    description: 'Ensure page title tags or Metadata title exports are configured for all routes.',
    severity: 'error',
    weight: 3,
    fixBlueprint: {
      title: 'Configure Page Meta Titles',
      targetFiles: ['app/layout.tsx', 'app/page.tsx'],
      summary: 'Set default title template and page-specific titles.',
      steps: [
        'In App Router layout, export `metadata` object with `title: { default: "...", template: "%s | App" }`.',
        'In individual pages, specify unique `title` string.',
      ],
    },
  },

  [RULE_IDS.META_DESCRIPTION]: {
    id: RULE_IDS.META_DESCRIPTION,
    number: 8,
    categoryId: 'seo-metadata',
    title: 'Meta Description on Every Page',
    description: 'Ensure meta description tags exist for layout and pages for search preview snippets.',
    severity: 'error',
    weight: 3,
    fixBlueprint: {
      title: 'Add Meta Description Tags',
      targetFiles: ['app/layout.tsx', 'app/page.tsx'],
      summary: 'Add concise, descriptive meta descriptions (150-160 characters).',
      steps: [
        'Export `description` in metadata config of layout and key pages.',
      ],
    },
  },

  [RULE_IDS.FAVICON_SET]: {
    id: RULE_IDS.FAVICON_SET,
    number: 9,
    categoryId: 'seo-metadata',
    title: 'Favicon Set (Multiple Sizes & Formats)',
    description: 'Verify favicon.ico, apple-touch-icon.png, and svg/png icons exist in public directory.',
    severity: 'error',
    weight: 2,
    fixBlueprint: {
      title: 'Add Complete Favicon Set',
      targetFiles: ['public/favicon.ico', 'public/apple-touch-icon.png', 'app/icon.png'],
      summary: 'Provide crisp icons for browser tabs, mobile bookmarks, and progressive web apps.',
      steps: [
        'Add standard `favicon.ico`, `apple-touch-icon.png` (180x180), and `icon.svg` or `icon.png` into `public/` or `app/`.',
      ],
    },
  },

  [RULE_IDS.ROBOTS_TXT]: {
    id: RULE_IDS.ROBOTS_TXT,
    number: 10,
    categoryId: 'seo-metadata',
    title: 'robots.txt File',
    description: 'Ensure robots.txt file exists to direct search engine crawlers and point to sitemap.xml.',
    severity: 'error',
    weight: 2,
    fixBlueprint: {
      title: 'Create robots.txt',
      targetFiles: ['public/robots.txt', 'app/robots.ts'],
      summary: 'Add crawlers rule and sitemap URL.',
      steps: [
        'Create `app/robots.ts` or `public/robots.txt`.',
        'Allow search bots and point `Sitemap: https://yourdomain.com/sitemap.xml`.',
      ],
      codeTemplate: `// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://example.com/sitemap.xml',
  };
}`,
    },
  },

  [RULE_IDS.SITEMAP_XML]: {
    id: RULE_IDS.SITEMAP_XML,
    number: 11,
    categoryId: 'seo-metadata',
    title: 'sitemap.xml Generator / File',
    description: 'Ensure automated sitemap.xml route or file exists for crawler indexing.',
    severity: 'error',
    weight: 3,
    fixBlueprint: {
      title: 'Generate sitemap.xml',
      targetFiles: ['app/sitemap.ts', 'public/sitemap.xml'],
      summary: 'Export XML sitemap route containing all active site URLs.',
      steps: [
        'Create `app/sitemap.ts` exporting an array of page objects with `url`, `lastModified`, `changeFrequency`.',
      ],
    },
  },

  [RULE_IDS.OPEN_GRAPH_IMAGE]: {
    id: RULE_IDS.OPEN_GRAPH_IMAGE,
    number: 12,
    categoryId: 'seo-metadata',
    title: 'Open Graph Image (Social Card Preview)',
    description: 'Ensure Open Graph image meta tags (`og:image`, `twitter:card`) and asset exist.',
    severity: 'error',
    weight: 3,
    fixBlueprint: {
      title: 'Configure Open Graph Preview Image',
      targetFiles: ['public/og-image.png', 'app/opengraph-image.png', 'app/layout.tsx'],
      summary: 'Provide a 1200x630px social preview image for links shared on Twitter/LinkedIn/WhatsApp.',
      steps: [
        'Add `public/og-image.png` or dynamic `app/opengraph-image.tsx`.',
        'Configure `openGraph: { images: [{ url: "/og-image.png", width: 1200, height: 630 }] }` in layout metadata.',
      ],
    },
  },

  [RULE_IDS.CANONICAL_URLS]: {
    id: RULE_IDS.CANONICAL_URLS,
    number: 13,
    categoryId: 'seo-metadata',
    title: 'Canonical URLs Configured',
    description: 'Set canonical URL tags to prevent duplicate content indexing penalty.',
    severity: 'warning',
    weight: 2,
    fixBlueprint: {
      title: 'Set Canonical URLs',
      targetFiles: ['app/layout.tsx'],
      summary: 'Set `metadataBase` and `alternates: { canonical: "./" }`.',
      steps: [
        'In root layout metadata, define `metadataBase: new URL("https://yourdomain.com")` and `alternates: { canonical: "/" }`.',
      ],
    },
  },

  [RULE_IDS.SCHEMA_JSON_LD]: {
    id: RULE_IDS.SCHEMA_JSON_LD,
    number: 14,
    categoryId: 'seo-metadata',
    title: 'Schema.org / JSON-LD Structured Data',
    description: 'Include Schema.org JSON-LD scripts (Organization, Product, WebSite, FAQ, or Breadcrumb).',
    severity: 'warning',
    weight: 2,
    fixBlueprint: {
      title: 'Embed JSON-LD Structured Data',
      targetFiles: ['components/json-ld.tsx', 'app/layout.tsx'],
      summary: 'Add structured JSON-LD schema for rich search snippets.',
      steps: [
        'Embed `<script type="application/ld+json">` with Organization and WebSite schema objects.',
      ],
      codeTemplate: `<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Your Company',
      url: 'https://example.com',
      logo: 'https://example.com/logo.png',
    }),
  }}
/>`,
    },
  },

  [RULE_IDS.HTML_LANG]: {
    id: RULE_IDS.HTML_LANG,
    number: 15,
    categoryId: 'seo-metadata',
    title: 'HTML lang Attribute Set',
    description: 'Ensure `<html lang="en">` attribute is explicitly set on root document element.',
    severity: 'error',
    weight: 2,
    fixBlueprint: {
      title: 'Set HTML lang Attribute',
      targetFiles: ['app/layout.tsx', 'pages/_document.tsx', 'index.html'],
      summary: 'Specify language code on root <html> tag.',
      steps: [
        'Update root layout element to `<html lang="en">`.',
      ],
    },
  },

  [RULE_IDS.IMAGE_ALT_TEXT]: {
    id: RULE_IDS.IMAGE_ALT_TEXT,
    number: 16,
    categoryId: 'accessibility-content',
    title: 'Alt Text on Every Image',
    description: 'Ensure image tags (`<img>` and `<Image>`) include descriptive `alt` attribute for accessibility.',
    severity: 'error',
    weight: 3,
    fixBlueprint: {
      title: 'Add Alt Text to Images',
      targetFiles: ['components/**/*.tsx', 'app/**/*.tsx'],
      summary: 'Provide meaningful alt descriptions for screen readers.',
      steps: [
        'Inspect image elements and ensure all non-decorative images have a non-empty `alt="..."` prop.',
        'Use `alt=""` explicitly for decorative background graphics.',
      ],
    },
  },

  [RULE_IDS.SEMANTIC_HTML]: {
    id: RULE_IDS.SEMANTIC_HTML,
    number: 17,
    categoryId: 'accessibility-content',
    title: 'Semantic HTML (<nav>, <main>, <header>, <footer>)',
    description: 'Use HTML5 semantic elements instead of generic div elements for key regions.',
    severity: 'warning',
    weight: 2,
    fixBlueprint: {
      title: 'Convert Div Soup to Semantic HTML',
      targetFiles: ['app/layout.tsx', 'components/navbar.tsx', 'components/footer.tsx'],
      summary: 'Replace container divs with `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, and `<section>`.',
      steps: [
        'Wrap main content in `<main>`.',
        'Wrap navigation links in `<nav>` and page header in `<header>`.',
      ],
    },
  },

  [RULE_IDS.ACCESSIBILITY_BASICS]: {
    id: RULE_IDS.ACCESSIBILITY_BASICS,
    number: 18,
    categoryId: 'accessibility-content',
    title: 'Accessibility Basics (Keyboard Nav & Visible Focus States)',
    description: 'Verify focus styles, contrast levels, and ARIA attributes on interactive controls.',
    severity: 'warning',
    weight: 2,
    fixBlueprint: {
      title: 'Add Focus Ring Styles & ARIA Labels',
      targetFiles: ['app/globals.css', 'styles/globals.css'],
      summary: 'Ensure clear focus outlines for keyboard navigation.',
      steps: [
        'Add global focus CSS: `:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }`.',
        'Ensure icon-only buttons have `aria-label`.',
      ],
    },
  },

  [RULE_IDS.PRINT_STYLESHEET]: {
    id: RULE_IDS.PRINT_STYLESHEET,
    number: 19,
    categoryId: 'accessibility-content',
    title: 'Print Stylesheet Support',
    description: 'Include basic `@media print` rules to cleanly format documents/articles when printed.',
    severity: 'warning',
    weight: 1,
    fixBlueprint: {
      title: 'Add Print Stylesheet Rules',
      targetFiles: ['app/globals.css', 'styles/globals.css'],
      summary: 'Hide sidebars, navbars, and clean up background colors for print output.',
      steps: [
        'Add `@media print { nav, footer, .no-print { display: none !important; } }` to CSS.',
      ],
    },
  },

  [RULE_IDS.CTA_ABOVE_FOLD]: {
    id: RULE_IDS.CTA_ABOVE_FOLD,
    number: 20,
    categoryId: 'ux-responsiveness',
    title: 'CTA Above the Fold',
    description: 'Ensure the homepage or landing view presents a clear Call-To-Action above the fold.',
    severity: 'error',
    weight: 3,
    fixBlueprint: {
      title: 'Place Hero CTA Above the Fold',
      targetFiles: ['app/page.tsx', 'components/hero.tsx'],
      summary: 'Add prominent primary button and input in hero section.',
      steps: [
        'Verify hero section includes headline, supporting paragraph, and primary action button visible without scrolling.',
      ],
    },
  },

  [RULE_IDS.STICKY_MOBILE_CTA]: {
    id: RULE_IDS.STICKY_MOBILE_CTA,
    number: 21,
    categoryId: 'ux-responsiveness',
    title: 'Sticky Mobile CTA',
    description: 'Provide a sticky bottom call-to-action banner or bar on mobile viewports for high conversions.',
    severity: 'warning',
    weight: 2,
    fixBlueprint: {
      title: 'Implement Sticky Mobile Action Bar',
      targetFiles: ['components/sticky-mobile-cta.tsx'],
      summary: 'Add fixed bottom bar on small viewports.',
      steps: [
        'Create component visible on mobile (`block md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-white border-t`).',
      ],
    },
  },

  [RULE_IDS.MOBILE_BREAKPOINTS]: {
    id: RULE_IDS.MOBILE_BREAKPOINTS,
    number: 22,
    categoryId: 'ux-responsiveness',
    title: 'Mobile Breakpoints & Viewport Meta',
    description: 'Ensure meta viewport is configured and responsive CSS grid/flex breakpoints exist.',
    severity: 'error',
    weight: 3,
    fixBlueprint: {
      title: 'Verify Mobile Breakpoints & Viewport',
      targetFiles: ['app/layout.tsx', 'index.html'],
      summary: 'Set `viewport: "width=device-width, initial-scale=1"`.',
      steps: [
        'Export viewport configuration object or include meta viewport tag.',
      ],
    },
  },

  [RULE_IDS.LOADING_STATES]: {
    id: RULE_IDS.LOADING_STATES,
    number: 23,
    categoryId: 'ux-responsiveness',
    title: 'Loading States (Skeletons & Spinners)',
    description: 'Provide loading skeleton boundaries (loading.tsx or spinner indicators) during async operations.',
    severity: 'warning',
    weight: 2,
    fixBlueprint: {
      title: 'Add Loading Suspense Boundary',
      targetFiles: ['app/loading.tsx', 'components/skeleton.tsx'],
      summary: 'Prevent layout shifts with skeleton placeholders.',
      steps: [
        'Create `app/loading.tsx` with animated pulse skeleton component.',
      ],
      codeTemplate: `export default function Loading() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
      <div className="h-10 bg-gray-200 rounded w-1/4"></div>
    </div>
  );
}`,
    },
  },

  [RULE_IDS.FORM_ERROR_STATES]: {
    id: RULE_IDS.FORM_ERROR_STATES,
    number: 24,
    categoryId: 'ux-responsiveness',
    title: 'Form Error States & Validation',
    description: 'Ensure forms render clear inline error messages and field validation feedback.',
    severity: 'error',
    weight: 3,
    fixBlueprint: {
      title: 'Add Inline Form Validation Feedback',
      targetFiles: ['components/form.tsx'],
      summary: 'Render visible red text warnings and aria-invalid attributes on input failure.',
      steps: [
        'Check inputs for error states, red border highlight, and readable error text messages below fields.',
      ],
    },
  },

  [RULE_IDS.COMPRESSED_IMAGES]: {
    id: RULE_IDS.COMPRESSED_IMAGES,
    number: 25,
    categoryId: 'performance',
    title: 'Compressed Modern Image Formats (WebP / AVIF)',
    description: 'Use optimized image components (Next/Image) with WebP/AVIF formats instead of raw uncompressed PNG/JPG files.',
    severity: 'error',
    weight: 3,
    fixBlueprint: {
      title: 'Optimize Image Assets with Modern Formats',
      targetFiles: ['next.config.js', 'components/**/*.tsx'],
      summary: 'Replace raw <img> tags with Next.js <Image> or configure image compression.',
      steps: [
        'Configure `formats: ["image/avif", "image/webp"]` in `next.config.js`.',
        'Import `Image` from `next/image`.',
      ],
    },
  },

  [RULE_IDS.LAZY_LOADING_BELOW_FOLD]: {
    id: RULE_IDS.LAZY_LOADING_BELOW_FOLD,
    number: 26,
    categoryId: 'performance',
    title: 'Lazy Loading Below-Fold Assets',
    description: 'Ensure images and heavy components below the fold are lazily loaded (`loading="lazy"`).',
    severity: 'warning',
    weight: 2,
    fixBlueprint: {
      title: 'Add Lazy Loading Below the Fold',
      targetFiles: ['components/**/*.tsx'],
      summary: 'Defer loading non-critical assets.',
      steps: [
        'Set `loading="lazy"` on below-the-fold images and dynamic imports for heavy modal/chart libraries.',
      ],
    },
  },

  [RULE_IDS.CORE_WEB_VITALS]: {
    id: RULE_IDS.CORE_WEB_VITALS,
    number: 27,
    categoryId: 'performance',
    title: 'Core Web Vitals Instrumenting (LCP, CLS, INP)',
    description: 'Set up performance monitoring or analytics reporting for LCP, CLS, and INP metrics.',
    severity: 'warning',
    weight: 2,
    fixBlueprint: {
      title: 'Instrument Core Web Vitals',
      targetFiles: ['app/layout.tsx', 'lib/vitals.ts'],
      summary: 'Import `web-vitals` or `@vercel/speed-insights` to track LCP, CLS, INP.',
      steps: [
        'Install `@vercel/speed-insights/next` or `web-vitals` package.',
        'Add `<SpeedInsights />` component into root layout.',
      ],
    },
  },

  [RULE_IDS.HTTPS_HSTS_HEADERS]: {
    id: RULE_IDS.HTTPS_HSTS_HEADERS,
    number: 28,
    categoryId: 'security-infra',
    title: 'HTTPS & HSTS Enforcement',
    description: 'Ensure HTTP Strict Transport Security (HSTS) headers and security headers are configured.',
    severity: 'error',
    weight: 3,
    fixBlueprint: {
      title: 'Configure HSTS & Security Headers',
      targetFiles: ['next.config.js', 'middleware.ts'],
      summary: 'Add Strict-Transport-Security, X-Content-Type-Options, X-Frame-Options headers.',
      steps: [
        'Add headers array in `next.config.js` or security middleware.',
      ],
      codeTemplate: `// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
    ];
  },
};`,
    },
  },

  [RULE_IDS.ENV_SECRETS_EXPOSURE]: {
    id: RULE_IDS.ENV_SECRETS_EXPOSURE,
    number: 29,
    categoryId: 'security-infra',
    title: 'Environment Variable & Secret Exposure Check',
    description: 'Ensure database passwords, private keys, or API tokens are never prefixed with NEXT_PUBLIC_ or VITE_.',
    severity: 'error',
    weight: 3,
    fixBlueprint: {
      title: 'Fix Secret Prefix Exposure',
      targetFiles: ['.env.local', '.env', 'lib/**/*.ts'],
      summary: 'Remove NEXT_PUBLIC_ prefix from secret API keys and private database credentials.',
      steps: [
        'Check `.env` files for private keys like `NEXT_PUBLIC_STRIPE_SECRET_KEY` or `NEXT_PUBLIC_DATABASE_URL`.',
        'Rename them without `NEXT_PUBLIC_` so they remain strictly server-side.',
      ],
    },
  },

  [RULE_IDS.API_RATE_LIMITING]: {
    id: RULE_IDS.API_RATE_LIMITING,
    number: 30,
    categoryId: 'security-infra',
    title: 'Rate Limiting on Forms & APIs',
    description: 'Implement basic rate limiting (Upstash, redis, memory bucket) on public API routes and contact forms.',
    severity: 'error',
    weight: 3,
    fixBlueprint: {
      title: 'Add API & Form Rate Limiting',
      targetFiles: ['app/api/contact/route.ts', 'middleware.ts'],
      summary: 'Prevent spam and abuse by rate limiting POST routes.',
      steps: [
        'Add rate limiting middleware or memory token bucket checks on POST handlers.',
      ],
    },
  },

  [RULE_IDS.REACT_ERROR_BOUNDARY]: {
    id: RULE_IDS.REACT_ERROR_BOUNDARY,
    number: 31,
    categoryId: 'security-infra',
    title: 'React Error Boundaries',
    description: 'Wrap major UI sections in React Error Boundaries so a single broken widget does not crash the app.',
    severity: 'warning',
    weight: 2,
    fixBlueprint: {
      title: 'Implement React Error Boundaries',
      targetFiles: ['components/error-boundary.tsx'],
      summary: 'Catch render exceptions in isolated UI components.',
      steps: [
        'Create component extending `React.Component` with `componentDidCatch` or use `react-error-boundary`.',
      ],
    },
  },

  [RULE_IDS.DB_BACKUP_STRATEGY]: {
    id: RULE_IDS.DB_BACKUP_STRATEGY,
    number: 32,
    categoryId: 'security-infra',
    title: 'Database Backup & Rollback Strategy',
    description: 'Document database snapshot frequency and schema migration rollback strategy (e.g. Prisma / Drizzle).',
    severity: 'warning',
    weight: 1,
    fixBlueprint: {
      title: 'Document DB Migration Rollback & Backup Strategy',
      targetFiles: ['README.md', 'docs/database.md'],
      summary: 'Document database automated daily snapshots and migration rollback commands.',
      steps: [
        'Add a section in README detailing automated backups and migration execution rules.',
      ],
    },
  },

  [RULE_IDS.COOKIE_BANNER]: {
    id: RULE_IDS.COOKIE_BANNER,
    number: 33,
    categoryId: 'compliance-trust',
    title: 'Cookie Consent Banner',
    description: 'Ensure cookie consent prompt is present for non-essential tracking/analytics cookies.',
    severity: 'error',
    weight: 3,
    fixBlueprint: {
      title: 'Add Cookie Consent Banner',
      targetFiles: ['components/cookie-banner.tsx', 'app/layout.tsx'],
      summary: 'Show bottom banner requiring explicit Accept/Decline before loading analytics scripts.',
      steps: [
        'Build `components/cookie-banner.tsx` storing user choice in localStorage.',
      ],
    },
  },

  [RULE_IDS.GDPR_CCPA_COMPLIANCE]: {
    id: RULE_IDS.GDPR_CCPA_COMPLIANCE,
    number: 34,
    categoryId: 'compliance-trust',
    title: 'GDPR / CCPA Compliant Data Handling',
    description: 'Provide data deletion request email or form link for privacy regulatory compliance.',
    severity: 'error',
    weight: 2,
    fixBlueprint: {
      title: 'Add Data Subject Request Section',
      targetFiles: ['app/privacy/page.tsx'],
      summary: 'Add clear instructions on how users can request data export or deletion under GDPR/CCPA.',
      steps: [
        'In `/privacy` page, add section "Data Subject Rights (GDPR & CCPA)" with contact email `privacy@yourdomain.com`.',
      ],
    },
  },

  [RULE_IDS.REAL_CONTACT_ADDRESS]: {
    id: RULE_IDS.REAL_CONTACT_ADDRESS,
    number: 35,
    categoryId: 'compliance-trust',
    title: 'Real Contact Address & Support Info',
    description: 'Include physical business address or registered contact address in footer or contact page.',
    severity: 'warning',
    weight: 2,
    fixBlueprint: {
      title: 'Add Business Contact Address',
      targetFiles: ['components/footer.tsx', 'app/contact/page.tsx'],
      summary: 'Increase trust by displaying business location and official contact email.',
      steps: [
        'Add company address, email, and support availability in footer or `/contact`.',
      ],
    },
  },

  [RULE_IDS.EMAIL_SPF_DKIM_DMARC]: {
    id: RULE_IDS.EMAIL_SPF_DKIM_DMARC,
    number: 36,
    categoryId: 'compliance-trust',
    title: 'Email Deliverability Documentation (SPF/DKIM/DMARC)',
    description: 'Verify transactional email setup includes SPF, DKIM, and DMARC DNS records.',
    severity: 'warning',
    weight: 2,
    fixBlueprint: {
      title: 'Configure Email Deliverability Records',
      targetFiles: ['docs/email.md', 'README.md'],
      summary: 'Ensure outbound emails from domain pass spam filters.',
      steps: [
        'Document DNS TXT records for SPF (`v=spf1 include:... ~all`), DKIM, and DMARC.',
      ],
    },
  },

  [RULE_IDS.WORKING_UNSUBSCRIBE_LINK]: {
    id: RULE_IDS.WORKING_UNSUBSCRIBE_LINK,
    number: 37,
    categoryId: 'compliance-trust',
    title: 'Working Unsubscribe Link',
    description: 'Ensure email subscription forms and footers include working one-click unsubscribe route or link.',
    severity: 'warning',
    weight: 2,
    fixBlueprint: {
      title: 'Create Unsubscribe Endpoint & Page',
      targetFiles: ['app/unsubscribe/page.tsx', 'app/api/unsubscribe/route.ts'],
      summary: 'Provide one-click opt-out for newsletter recipients.',
      steps: [
        'Create `/unsubscribe` route accepting token or email parameter to update email preferences.',
      ],
    },
  },

  [RULE_IDS.ANALYTICS_INSTALLED]: {
    id: RULE_IDS.ANALYTICS_INSTALLED,
    number: 38,
    categoryId: 'analytics-qa',
    title: 'Analytics Installed (Vercel, Plausible, PostHog, GA)',
    description: 'Ensure privacy-friendly analytics script or SDK is configured to measure visitors and conversions.',
    severity: 'error',
    weight: 3,
    fixBlueprint: {
      title: 'Install Privacy-Friendly Analytics',
      targetFiles: ['app/layout.tsx'],
      summary: 'Integrate Vercel Analytics, Plausible, or PostHog script.',
      steps: [
        'Add `@vercel/analytics/react` `<Analytics />` component or preferred analytics snippet into root layout.',
      ],
    },
  },

  [RULE_IDS.BROKEN_LINK_CHECK]: {
    id: RULE_IDS.BROKEN_LINK_CHECK,
    number: 39,
    categoryId: 'analytics-qa',
    title: 'Broken Link Checker Configured',
    description: 'Add a pre-deploy or CI script to audit internal and external hyper-links for 404 dead ends.',
    severity: 'warning',
    weight: 2,
    fixBlueprint: {
      title: 'Configure Pre-deploy Broken Link Audit',
      targetFiles: ['package.json'],
      summary: 'Add script `audit:links` using lychee or link-checker.',
      steps: [
        'Add script `"audit:links": "npx linkinator http://localhost:3000 --recurse"` to package.json.',
      ],
    },
  },
};
