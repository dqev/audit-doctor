import { Diagnostic, ProjectInfo } from '../core/types.js';
import { auditPagesRouting } from './pages-routing.js';
import { auditSeoMetadata } from './seo-metadata.js';
import { auditAccessibilityContent } from './accessibility-content.js';
import { auditUxResponsiveness } from './ux-responsiveness.js';
import { auditPerformance } from './performance.js';
import { auditSecurityInfra } from './security-infra.js';
import { auditComplianceTrust } from './compliance-trust.js';
import { auditAnalyticsQa } from './analytics-qa.js';

export function runAllAudits(project: ProjectInfo): Diagnostic[] {
  return [
    ...auditPagesRouting(project),
    ...auditSeoMetadata(project),
    ...auditAccessibilityContent(project),
    ...auditUxResponsiveness(project),
    ...auditPerformance(project),
    ...auditSecurityInfra(project),
    ...auditComplianceTrust(project),
    ...auditAnalyticsQa(project),
  ];
}
