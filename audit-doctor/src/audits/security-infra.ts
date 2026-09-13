import { Diagnostic, ProjectInfo } from '../core/types.js';
import { RULE_IDS } from '../core/rule-ids.js';
import { ALL_RULES } from '../core/rule-definitions.js';
import { anyFileExists, searchFileContent } from '../project/file-utils.js';

export function auditSecurityInfra(project: ProjectInfo): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const root = project.rootDirectory;
  const isNext = project.framework === 'nextjs-app' || project.framework === 'nextjs-pages';

  // 28. HTTPS & HSTS headers
  const hstsMatch = searchFileContent(
    root,
    [...project.routes, 'next.config.js', 'next.config.ts', 'next.config.mjs', 'vercel.json', 'netlify.toml', '_headers', 'nginx.conf'],
    /Strict-Transport-Security|hsts|X-Content-Type-Options/i
  );
  if (!hstsMatch.found) {
    const rule = ALL_RULES[RULE_IDS.HTTPS_HSTS_HEADERS];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No HSTS security headers or Strict-Transport-Security configuration detected.',
      help: isNext
        ? 'Add HSTS and security headers array in `next.config.js` or security middleware.'
        : 'Add HSTS headers in hosting config (`vercel.json`, `_headers`, `netlify.toml`, or Nginx).',
      fixBlueprint: isNext
        ? rule.fixBlueprint
        : {
            ...rule.fixBlueprint,
            targetFiles: ['vercel.json', '_headers', 'netlify.toml'],
            summary: 'Add Strict-Transport-Security, X-Content-Type-Options, X-Frame-Options headers.',
            steps: [
              'Create or update `vercel.json` or `_headers` file with security headers.',
            ],
            codeTemplate: `// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" }
      ]
    }
  ]
}`,
          },
    });
  }

  // 29. Env secret exposure
  const secretExposedMatch = searchFileContent(
    root,
    ['.env', '.env.local', '.env.development', '.env.production', ...project.routes],
    /(?:NEXT_PUBLIC_|VITE_|PUBLIC_).*(?:SECRET|PRIVATE|PASSWORD|DATABASE_URL|SERVICE_ROLE|API_TOKEN)/i
  );
  if (secretExposedMatch.found) {
    const rule = ALL_RULES[RULE_IDS.ENV_SECRETS_EXPOSURE];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'Potential secret API key or password exposed with public environment prefix.',
      filePath: secretExposedMatch.filePath,
      help: 'Remove public environment prefix (e.g. `NEXT_PUBLIC_` or `VITE_`) from private backend secrets.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 30. Rate limiting on forms/APIs
  const rateLimitMatch = searchFileContent(
    root,
    [...project.routes, 'middleware.ts', 'middleware.js', 'src/middleware.ts'],
    /rateLimit|ratelimit|upstash\/ratelimit|express-rate-limit/i
  );
  if (!rateLimitMatch.found) {
    const rule = ALL_RULES[RULE_IDS.API_RATE_LIMITING];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No rate limiting middleware or abuse protection found on API/form endpoints.',
      help: 'Implement rate limiting middleware to prevent automated spam and DDoS attacks.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 31. React Error Boundary
  const errorBoundaryMatch = searchFileContent(
    root,
    project.routes,
    /ErrorBoundary|componentDidCatch|react-error-boundary/i
  );
  if (!errorBoundaryMatch.found) {
    const rule = ALL_RULES[RULE_IDS.REACT_ERROR_BOUNDARY];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No React Error Boundaries found to isolate component runtime crashes.',
      help: 'Wrap major UI sections in ErrorBoundary components.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 32. Database backup strategy
  const dbMatch = searchFileContent(
    root,
    ['package.json', ...project.routes],
    /prisma|drizzle|mongoose|supabase|mongodb|pg/i
  );
  const dbBackupDoc = anyFileExists(root, ['docs/database.md', 'docs/db.md']);
  const dbDocMatch = searchFileContent(
    root,
    ['README.md'],
    /database backup|db backup|migration rollback/i
  );
  if (dbMatch.found && !dbBackupDoc && !dbDocMatch.found) {
    const rule = ALL_RULES[RULE_IDS.DB_BACKUP_STRATEGY];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'Database ORM/driver detected but backup & migration rollback strategy is undocumented.',
      help: 'Document automated daily DB snapshot routine and migration rollback steps in README.md.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  return diagnostics;
}
