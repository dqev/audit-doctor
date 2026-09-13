import { Diagnostic, ProjectInfo } from '../core/types.js';
import { RULE_IDS } from '../core/rule-ids.js';
import { ALL_RULES } from '../core/rule-definitions.js';
import { anyFileExists, searchFileContent } from '../project/file-utils.js';

export function auditUxResponsiveness(project: ProjectInfo): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const root = project.rootDirectory;
  const htmlFiles = ['index.html', 'public/index.html', 'src/index.html'];
  const allSearchFiles = Array.from(new Set([...htmlFiles, ...project.routes]));

  // 20. CTA above the fold
  const ctaMatch = searchFileContent(
    root,
    allSearchFiles,
    /Get Started|Sign Up|Start Free|Try Now|Subscribe|Buy Now|<button|className=".*btn|className=".*button/i
  );
  if (!ctaMatch.found) {
    const rule = ALL_RULES[RULE_IDS.CTA_ABOVE_FOLD];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No primary Call-To-Action (CTA) element detected above the fold in hero views.',
      help: 'Place a high-contrast action button visible immediately upon landing without scrolling.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 21. Sticky mobile CTA
  const stickyMatch = searchFileContent(
    root,
    allSearchFiles,
    /fixed bottom-0|sticky bottom-0|mobile-cta|sticky-cta|fixed.*bottom/i
  );
  if (!stickyMatch.found) {
    const rule = ALL_RULES[RULE_IDS.STICKY_MOBILE_CTA];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No sticky mobile CTA bar found for small screen viewports.',
      help: 'Add a sticky bottom CTA banner visible on mobile viewports for higher conversions.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 22. Mobile breakpoints
  const mobileMatch = searchFileContent(
    root,
    allSearchFiles,
    /sm:|md:|lg:|@media|viewport|width=device-width/i
  );
  if (!mobileMatch.found) {
    const rule = ALL_RULES[RULE_IDS.MOBILE_BREAKPOINTS];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No mobile CSS media query breakpoints or viewport meta tags configured.',
      help: 'Ensure meta viewport tag is present and grid layouts use mobile responsive breakpoints.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 23. Loading states
  const loadingFiles = [
    'app/loading.tsx',
    'app/loading.js',
    'src/app/loading.tsx',
    'components/skeleton.tsx',
    'src/components/Skeleton.tsx',
    'components/loading-spinner.tsx',
    'src/components/Spinner.tsx',
  ];
  const loadingMatch = searchFileContent(
    root,
    allSearchFiles,
    /animate-pulse|Skeleton|loading\.tsx|Spinner|<Loading|Suspense|isLoading|loadingSpinner/i
  );
  if (!anyFileExists(root, loadingFiles) && !loadingMatch.found) {
    const rule = ALL_RULES[RULE_IDS.LOADING_STATES];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No loading state components (app/loading.tsx, Suspense, or skeleton placeholders) found.',
      help: 'Create a Loading spinner or Skeleton UI placeholder while data fetches.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 24. Form error states
  const formMatch = searchFileContent(
    root,
    allSearchFiles,
    /<form|onSubmit|handleSubmit/i
  );
  const formErrorMatch = searchFileContent(
    root,
    allSearchFiles,
    /formState\.errors|error.*text-red|aria-invalid|invalid-feedback|errorState|fieldError/i
  );
  if (formMatch.found && !formErrorMatch.found) {
    const rule = ALL_RULES[RULE_IDS.FORM_ERROR_STATES];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'Forms detected without inline validation error feedback states.',
      filePath: formMatch.filePath,
      help: 'Render clear error messages and red border indicators on invalid form input fields.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  return diagnostics;
}
