import { Diagnostic, ProjectInfo } from '../core/types.js';
import { RULE_IDS } from '../core/rule-ids.js';
import { ALL_RULES } from '../core/rule-definitions.js';
import { searchFileContent } from '../project/file-utils.js';

export function auditAccessibilityContent(project: ProjectInfo): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const root = project.rootDirectory;

  // 16. Alt text on every image
  // Check if img or Image tags exist without alt prop
  const imgWithoutAlt = searchFileContent(
    root,
    project.routes,
    /<img(?![^>]*\balt=)[^>]*>|<Image(?![^>]*\balt=)[^>]*>/i
  );
  if (imgWithoutAlt.found) {
    const rule = ALL_RULES[RULE_IDS.IMAGE_ALT_TEXT];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'Unwrapped <img> or <Image> tag missing required `alt` attribute.',
      filePath: imgWithoutAlt.filePath,
      help: 'Add descriptive `alt="..."` attributes to all images for screen reader accessibility.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 17. Semantic HTML
  const semanticMatch = searchFileContent(
    root,
    project.routes,
    /<main|<nav|<header|<footer/i
  );
  if (!semanticMatch.found) {
    const rule = ALL_RULES[RULE_IDS.SEMANTIC_HTML];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'Lack of semantic HTML5 landmark tags (<main>, <nav>, <header>, <footer>).',
      help: 'Replace generic `<div>` wrappers with semantic landmarks.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 18. Accessibility basics (focus rings & ARIA)
  const focusMatch = searchFileContent(
    root,
    project.routes,
    /focus-visible|focus:ring|focus:outline|aria-label|aria-expanded/i
  );
  if (!focusMatch.found) {
    const rule = ALL_RULES[RULE_IDS.ACCESSIBILITY_BASICS];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No keyboard focus states (focus-visible) or ARIA accessibility attributes found.',
      help: 'Add focus ring outline styles and aria-label attributes to interactive buttons.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 19. Print stylesheet
  const printMatch = searchFileContent(
    root,
    project.routes,
    /@media print|media="print"/i
  );
  if (!printMatch.found) {
    const rule = ALL_RULES[RULE_IDS.PRINT_STYLESHEET];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No print stylesheet (@media print) rules detected in global CSS.',
      help: 'Add `@media print` CSS block to hide navigation menus when printing pages.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  return diagnostics;
}
