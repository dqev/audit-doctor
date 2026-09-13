import { Diagnostic, ProjectInfo } from '../core/types.js';
import { RULE_IDS } from '../core/rule-ids.js';
import { ALL_RULES } from '../core/rule-definitions.js';
import { searchFileContent } from '../project/file-utils.js';

export function auditAnalyticsQa(project: ProjectInfo): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const root = project.rootDirectory;

  // 38. Analytics installed
  const analyticsMatch = searchFileContent(
    root,
    [...project.routes, 'package.json'],
    /Analytics|plausible|posthog|google-analytics|gtag|mixpanel|amplitude|@vercel\/analytics/i
  );
  if (!analyticsMatch.found) {
    const rule = ALL_RULES[RULE_IDS.ANALYTICS_INSTALLED];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No analytics telemetry script (Vercel Analytics, Plausible, PostHog, GA) detected.',
      help: 'Install privacy-friendly analytics SDK into root layout to monitor site visits.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 39. Broken link check run
  const linkCheckMatch = searchFileContent(
    root,
    ['package.json', '.github/workflows/*.yml'],
    /linkinator|lychee|broken-link-checker|link-check/i
  );
  if (!linkCheckMatch.found) {
    const rule = ALL_RULES[RULE_IDS.BROKEN_LINK_CHECK];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No automated pre-deploy broken link checker tool or script configured.',
      help: 'Add `"audit:links": "npx linkinator http://localhost:3000 --recurse"` to package.json scripts.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  return diagnostics;
}
