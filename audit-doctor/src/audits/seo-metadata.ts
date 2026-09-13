import { Diagnostic, ProjectInfo } from '../core/types.js';
import { RULE_IDS } from '../core/rule-ids.js';
import { ALL_RULES } from '../core/rule-definitions.js';
import { anyFileExists, searchFileContent } from '../project/file-utils.js';

export function auditSeoMetadata(project: ProjectInfo): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const root = project.rootDirectory;

  // Include index.html locations in search scope
  const htmlFiles = ['index.html', 'public/index.html', 'src/index.html'];
  const allSearchFiles = [...htmlFiles, ...project.routes];

  // 7. Meta Title
  const titleMatch = searchFileContent(
    root,
    allSearchFiles,
    /title:|export const metadata =|<title>|Helmet.*title|SeoHelmet|MetaTags/i
  );
  if (!titleMatch.found) {
    const rule = ALL_RULES[RULE_IDS.META_TITLE];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No metadata title export or <title> tags detected across layout or pages.',
      help: 'Export `metadata.title` in layout or set `<title>` tags in HTML / Helmet for SEO.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 8. Meta Description
  const descMatch = searchFileContent(
    root,
    allSearchFiles,
    /description:|name="description"|<meta name="description"|Helmet.*description/i
  );
  if (!descMatch.found) {
    const rule = ALL_RULES[RULE_IDS.META_DESCRIPTION];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No meta description detected in site metadata configuration.',
      help: 'Add `metadata.description` or `<meta name="description">` tag for search engines.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 9. Favicon set
  const faviconFiles = [
    'public/favicon.ico',
    'public/apple-touch-icon.png',
    'public/favicon.svg',
    'public/favicon.png',
    'app/favicon.ico',
    'app/icon.png',
    'app/icon.svg',
    'src/favicon.ico',
  ];
  if (!anyFileExists(root, faviconFiles)) {
    const rule = ALL_RULES[RULE_IDS.FAVICON_SET];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'Missing favicon files (favicon.ico or apple-touch-icon.png).',
      help: 'Add standard favicons and apple touch icons into `public/` or `app/`.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 10. robots.txt
  const robotsFiles = ['public/robots.txt', 'robots.txt', 'app/robots.ts', 'app/robots.js', 'src/app/robots.ts'];
  if (!anyFileExists(root, robotsFiles)) {
    const rule = ALL_RULES[RULE_IDS.ROBOTS_TXT];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No robots.txt file or route dynamic generator found.',
      help: 'Create `public/robots.txt` or `app/robots.ts` to instruct crawlers.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 11. sitemap.xml
  const sitemapFiles = [
    'public/sitemap.xml',
    'sitemap.xml',
    'app/sitemap.ts',
    'app/sitemap.js',
    'src/app/sitemap.ts',
  ];
  if (!anyFileExists(root, sitemapFiles)) {
    const rule = ALL_RULES[RULE_IDS.SITEMAP_XML];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No sitemap.xml file or dynamic sitemap generator detected.',
      help: 'Create `app/sitemap.ts` or `public/sitemap.xml` for search indexers.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 12. Open Graph image
  const ogMatch = searchFileContent(
    root,
    allSearchFiles,
    /openGraph:|og:image|twitter:card|opengraph-image|ogImage/i
  );
  const ogFiles = [
    'public/og-image.png',
    'public/og.png',
    'public/og-image.jpg',
    'app/opengraph-image.png',
    'app/opengraph-image.tsx',
  ];
  if (!ogMatch.found && !anyFileExists(root, ogFiles)) {
    const rule = ALL_RULES[RULE_IDS.OPEN_GRAPH_IMAGE];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'Open Graph image preview tag or asset (og-image) missing.',
      help: 'Configure `openGraph.images` or `<meta property="og:image">` and add a 1200x630 social card.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 13. Canonical URLs
  const canonicalMatch = searchFileContent(
    root,
    allSearchFiles,
    /canonical:|metadataBase:|rel="canonical"/i
  );
  if (!canonicalMatch.found) {
    const rule = ALL_RULES[RULE_IDS.CANONICAL_URLS];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No canonical URL meta tags or metadataBase specified.',
      help: 'Set `<link rel="canonical" href="...">` or `metadataBase` to avoid duplicate content penalties.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 14. Schema.org / JSON-LD
  const schemaMatch = searchFileContent(
    root,
    allSearchFiles,
    /application\/ld\+json|schema\.org/i
  );
  if (!schemaMatch.found) {
    const rule = ALL_RULES[RULE_IDS.SCHEMA_JSON_LD];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No Schema.org / JSON-LD structured data detected in codebase.',
      help: 'Embed Organization or WebSite JSON-LD structured data script for rich search snippets.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 15. HTML lang attribute
  const langMatch = searchFileContent(
    root,
    allSearchFiles,
    /<html[^>]*\blang=/i
  );
  if (!langMatch.found) {
    const rule = ALL_RULES[RULE_IDS.HTML_LANG];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'Root <html> element missing explicit `lang` attribute.',
      help: 'Add `lang="en"` to `<html lang="en">` in index.html or root layout template.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  return diagnostics;
}
