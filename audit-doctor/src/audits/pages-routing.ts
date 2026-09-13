import { Diagnostic, ProjectInfo } from '../core/types.js';
import { RULE_IDS } from '../core/rule-ids.js';
import { ALL_RULES } from '../core/rule-definitions.js';
import { anyFileExists, searchFileContent } from '../project/file-utils.js';

export function auditPagesRouting(project: ProjectInfo): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const root = project.rootDirectory;
  const routes = project.routes;

  // Search scope includes router definitions (App.tsx, routes.tsx, main.tsx, router.tsx)
  const routerFiles = ['src/App.tsx', 'src/App.jsx', 'src/routes.tsx', 'src/router.tsx', 'src/main.tsx', 'App.tsx', 'App.jsx'];
  const allSearchFiles = Array.from(new Set([...routerFiles, ...routes]));

  // 1. Custom 404
  const has404File = routes.some((f) =>
    /(?:^|\/)(?:404|not-found)(?:\/|\.|$)/i.test(f)
  ) || anyFileExists(root, [
    'app/not-found.tsx',
    'app/not-found.js',
    'src/app/not-found.tsx',
    'pages/404.tsx',
    'pages/404.js',
    'src/pages/404.tsx',
    'src/pages/not-found.tsx',
    'src/pages/not-found/index.tsx',
  ]);

  const has404Component = searchFileContent(
    root,
    allSearchFiles,
    /NotFound|PageNotFound|Custom404|NotFoundPage|path=["'`]\*["'`]|path=["'`]\/404|path=["'`]\/not-found/i
  ).found;

  if (!has404File && !has404Component) {
    const rule = ALL_RULES[RULE_IDS.CUSTOM_404];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No custom 404 Not Found page or fallback route detected in routes/components.',
      help: 'Create a 404 Not Found page component (e.g. `src/pages/not-found`) or catch-all route `<Route path="*" element={<NotFound />} />`.',
      fixBlueprint: {
        ...rule.fixBlueprint,
        steps: [
          'Create `src/pages/not-found/index.tsx` or `src/pages/NotFound.tsx`.',
          'In your React Router / App.tsx, add fallback route: `<Route path="*" element={<NotFoundPage />} />`.',
        ],
      },
    });
  }

  // 2. Custom 500 / Error page
  const hasErrorFile = routes.some((f) =>
    /(?:^|\/)(?:500|error|global-error)(?:\/|\.|$)/i.test(f)
  ) || anyFileExists(root, [
    'app/error.tsx',
    'app/error.js',
    'app/global-error.tsx',
    'src/app/error.tsx',
    'pages/500.tsx',
    'pages/500.js',
    'src/pages/500.tsx',
    'src/pages/error.tsx',
    'components/error-boundary.tsx',
    'src/components/ErrorBoundary.tsx',
  ]);

  const hasErrorComponent = searchFileContent(
    root,
    allSearchFiles,
    /ErrorBoundary|ErrorPage|Custom500|ServerErrors|useRouteError|componentDidCatch|react-error-boundary/i
  ).found;

  if (!hasErrorFile && !hasErrorComponent) {
    const rule = ALL_RULES[RULE_IDS.CUSTOM_500];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No custom server error page or React Error Boundary (500) detected.',
      help: 'Create an Error Boundary or 500 Error Page component to catch application crashes gracefully.',
      fixBlueprint: {
        ...rule.fixBlueprint,
        steps: [
          'Create `src/components/ErrorBoundary.tsx` using `react-error-boundary` or React class component.',
          'Wrap main app layout in `<ErrorBoundary fallback={<ErrorPage />}>`.',
        ],
      },
    });
  }

  // 3. Thank you page
  const hasThankYouFile = routes.some((f) =>
    /(?:^|\/)(?:thank-you|thanks|confirmation)(?:\/|\.|$)/i.test(f)
  );

  const hasThankYouComponent = searchFileContent(
    root,
    allSearchFiles,
    /ThankYou|ThankYouPage|ConfirmationPage|path=["'`]\/thank-you|path=["'`]\/thanks/i
  ).found;

  if (!hasThankYouFile && !hasThankYouComponent) {
    const rule = ALL_RULES[RULE_IDS.THANK_YOU_PAGE];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No dedicated Thank You / submission confirmation page found.',
      help: 'Create a `/thank-you` route or component for post-form submission conversion tracking.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 4. Privacy policy page
  const hasPrivacyFile = routes.some((f) =>
    /(?:^|\/)(?:privacy|privacy-policy)(?:\/|\.|$)/i.test(f)
  );

  const hasPrivacyComponent = searchFileContent(
    root,
    allSearchFiles,
    /PrivacyPage|PrivacyPolicy|PrivacyStatement|path=["'`]\/privacy|path=["'`]\/privacy-policy/i
  ).found;

  if (!hasPrivacyFile && !hasPrivacyComponent) {
    const rule = ALL_RULES[RULE_IDS.PRIVACY_POLICY];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'Privacy policy page is missing (/privacy or /privacy-policy).',
      help: 'Add a Privacy Policy route or page component (e.g. `src/pages/privacy`) for GDPR/CCPA legal compliance.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 5. Terms & conditions page
  const hasTermsFile = routes.some((f) =>
    /(?:^|\/)(?:terms|terms-of-service|terms-and-conditions)(?:\/|\.|$)/i.test(f)
  );

  const hasTermsComponent = searchFileContent(
    root,
    allSearchFiles,
    /TermsPage|TermsAndConditions|TermsOfService|Terms|path=["'`]\/terms|path=["'`]\/terms-of-service/i
  ).found;

  if (!hasTermsFile && !hasTermsComponent) {
    const rule = ALL_RULES[RULE_IDS.TERMS_CONDITIONS];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'Terms and Conditions page is missing (/terms or /terms-of-service).',
      help: 'Add a Terms of Service route or page component (e.g. `src/pages/terms`) outlining platform usage rules.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 6. Empty states UI
  const emptyStateMatch = searchFileContent(
    root,
    routes,
    /EmptyState|empty-state|No results|No data available|no-results/i
  );
  if (!emptyStateMatch.found) {
    const rule = ALL_RULES[RULE_IDS.EMPTY_STATES];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No empty state components or "no results" handling detected in views.',
      help: 'Create an EmptyState component for zero-search results and empty list views.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  return diagnostics;
}
