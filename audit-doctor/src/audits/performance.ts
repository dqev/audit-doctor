import { Diagnostic, ProjectInfo } from '../core/types.js';
import { RULE_IDS } from '../core/rule-ids.js';
import { ALL_RULES } from '../core/rule-definitions.js';
import { searchFileContent } from '../project/file-utils.js';

export function auditPerformance(project: ProjectInfo): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const root = project.rootDirectory;
  const isNext = project.framework === 'nextjs-app' || project.framework === 'nextjs-pages';

  // 25. Compressed images
  const nextImageMatch = searchFileContent(
    root,
    project.routes,
    /import Image from 'next\/image'|formats: \['image\/avif'/i
  );
  const webpAvifMatch = searchFileContent(
    root,
    project.routes,
    /\.webp|\.avif|<picture>/i
  );
  const rawImgMatch = searchFileContent(
    root,
    project.routes,
    /<img /i
  );

  if (isNext && rawImgMatch.found && !nextImageMatch.found) {
    const rule = ALL_RULES[RULE_IDS.COMPRESSED_IMAGES];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'Raw <img> tags detected instead of modern compressed Next.js <Image> component.',
      filePath: rawImgMatch.filePath,
      help: 'Replace standard <img> with `next/image` to serve WebP/AVIF compressed variants.',
      fixBlueprint: rule.fixBlueprint,
    });
  } else if (!isNext && rawImgMatch.found && !webpAvifMatch.found) {
    const rule = ALL_RULES[RULE_IDS.COMPRESSED_IMAGES];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'Raw image tags detected without modern format optimization (WebP / AVIF).',
      filePath: rawImgMatch.filePath,
      help: 'Use WebP or AVIF image formats, <picture> elements, or an image optimization plugin.',
      fixBlueprint: {
        ...rule.fixBlueprint,
        steps: [
          'Convert PNG/JPG assets to modern WebP or AVIF format using sharp or Squoosh.',
          'Use `<picture><source srcset="image.webp" type="image/webp" /><img src="image.png" /></picture>`.',
        ],
        codeTemplate: `<picture>
  <source srcset="/hero.webp" type="image/webp" />
  <img src="/hero.png" alt="Hero banner" loading="lazy" />
</picture>`,
      },
    });
  }

  // 26. Lazy loading below-fold
  const lazyMatch = searchFileContent(
    root,
    project.routes,
    /loading="lazy"|loading='lazy'|dynamic\(/i
  );
  if (!lazyMatch.found) {
    const rule = ALL_RULES[RULE_IDS.LAZY_LOADING_BELOW_FOLD];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No lazy loading attributes or dynamic imports detected for below-fold content.',
      help: 'Add `loading="lazy"` on below-the-fold media elements.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 27. Core Web Vitals
  const vitalsMatch = searchFileContent(
    root,
    project.routes,
    /SpeedInsights|web-vitals|reportWebVitals|useReportWebVitals/i
  );
  const hasVitalsPkg = project.packageJson?.dependencies?.['@vercel/speed-insights'] ||
    project.packageJson?.dependencies?.['web-vitals'];

  if (!vitalsMatch.found && !hasVitalsPkg) {
    const rule = ALL_RULES[RULE_IDS.CORE_WEB_VITALS];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No Core Web Vitals telemetry instrumentation (@vercel/speed-insights or web-vitals).',
      help: 'Add `<SpeedInsights />` or `web-vitals` library to measure LCP, CLS, and INP metrics.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  return diagnostics;
}
