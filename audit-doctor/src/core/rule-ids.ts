import { CategoryId, CategoryInfo } from './types.js';

export const CATEGORIES: Record<CategoryId, CategoryInfo> = {
  'pages-routing': {
    id: 'pages-routing',
    title: 'Pages & Routing',
    description: 'Essential routing pages, custom error boundaries, policy pages, and empty state handles',
  },
  'seo-metadata': {
    id: 'seo-metadata',
    title: 'SEO & Metadata',
    description: 'Search engine optimization tags, canonical URLs, structured data, open graph, and sitemaps',
  },
  'accessibility-content': {
    id: 'accessibility-content',
    title: 'Accessibility & Content',
    description: 'a11y contrast, keyboard nav, image alt attributes, semantic tags, and print stylesheets',
  },
  'ux-responsiveness': {
    id: 'ux-responsiveness',
    title: 'UX & Responsiveness',
    description: 'Mobile layout breakpoints, call-to-actions, loading indicators, and form error states',
  },
  'performance': {
    id: 'performance',
    title: 'Performance',
    description: 'Image optimization, lazy loading, and Core Web Vitals instrumentation',
  },
  'security-infra': {
    id: 'security-infra',
    title: 'Security & Infra',
    description: 'HTTPS/HSTS enforcement, secret leakage checks, rate limiting, error boundaries, and database safety',
  },
  'compliance-trust': {
    id: 'compliance-trust',
    title: 'Compliance & Trust',
    description: 'Cookie consent, GDPR/CCPA disclosures, contact info, transactional email authentication, and unsubscribe options',
  },
  'analytics-qa': {
    id: 'analytics-qa',
    title: 'Analytics & QA',
    description: 'Telemetry setup and pre-deploy link integrity tools',
  },
};

export const RULE_IDS = {
  // Pages & routing
  CUSTOM_404: 'custom-404',
  CUSTOM_500: 'custom-500',
  THANK_YOU_PAGE: 'thank-you-page',
  PRIVACY_POLICY: 'privacy-policy',
  TERMS_CONDITIONS: 'terms-conditions',
  EMPTY_STATES: 'empty-states',

  // SEO & metadata
  META_TITLE: 'meta-title',
  META_DESCRIPTION: 'meta-description',
  FAVICON_SET: 'favicon-set',
  ROBOTS_TXT: 'robots-txt',
  SITEMAP_XML: 'sitemap-xml',
  OPEN_GRAPH_IMAGE: 'open-graph-image',
  CANONICAL_URLS: 'canonical-urls',
  SCHEMA_JSON_LD: 'schema-json-ld',
  HTML_LANG: 'html-lang',

  // Accessibility & content
  IMAGE_ALT_TEXT: 'image-alt-text',
  SEMANTIC_HTML: 'semantic-html',
  ACCESSIBILITY_BASICS: 'accessibility-basics',
  PRINT_STYLESHEET: 'print-stylesheet',

  // UX & responsiveness
  CTA_ABOVE_FOLD: 'cta-above-fold',
  STICKY_MOBILE_CTA: 'sticky-mobile-cta',
  MOBILE_BREAKPOINTS: 'mobile-breakpoints',
  LOADING_STATES: 'loading-states',
  FORM_ERROR_STATES: 'form-error-states',

  // Performance
  COMPRESSED_IMAGES: 'compressed-images',
  LAZY_LOADING_BELOW_FOLD: 'lazy-loading-below-fold',
  CORE_WEB_VITALS: 'core-web-vitals',

  // Security & infra
  HTTPS_HSTS_HEADERS: 'https-hsts-headers',
  ENV_SECRETS_EXPOSURE: 'env-secrets-exposure',
  API_RATE_LIMITING: 'api-rate-limiting',
  REACT_ERROR_BOUNDARY: 'react-error-boundary',
  DB_BACKUP_STRATEGY: 'db-backup-strategy',

  // Compliance & trust
  COOKIE_BANNER: 'cookie-banner',
  GDPR_CCPA_COMPLIANCE: 'gdpr-ccpa-compliance',
  REAL_CONTACT_ADDRESS: 'real-contact-address',
  EMAIL_SPF_DKIM_DMARC: 'email-spf-dkim-dmarc',
  WORKING_UNSUBSCRIBE_LINK: 'working-unsubscribe-link',

  // Analytics & QA
  ANALYTICS_INSTALLED: 'analytics-installed',
  BROKEN_LINK_CHECK: 'broken-link-check',
} as const;
