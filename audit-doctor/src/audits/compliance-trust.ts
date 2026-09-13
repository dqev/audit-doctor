import { Diagnostic, ProjectInfo } from '../core/types.js';
import { RULE_IDS } from '../core/rule-ids.js';
import { ALL_RULES } from '../core/rule-definitions.js';
import { searchFileContent } from '../project/file-utils.js';

export function auditComplianceTrust(project: ProjectInfo): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const root = project.rootDirectory;

  // 33. Cookie banner
  const cookieMatch = searchFileContent(
    root,
    project.routes,
    /CookieBanner|cookie-consent|cookie_consent|accept-cookies|CookiesConsent/i
  );
  if (!cookieMatch.found) {
    const rule = ALL_RULES[RULE_IDS.COOKIE_BANNER];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No cookie consent banner or privacy prompt component detected.',
      help: 'Create a cookie consent banner component before placing non-essential tracking cookies.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 34. GDPR / CCPA compliance
  const gdprMatch = searchFileContent(
    root,
    project.routes,
    /GDPR|CCPA|data deletion|privacy@|data subject request/i
  );
  if (!gdprMatch.found) {
    const rule = ALL_RULES[RULE_IDS.GDPR_CCPA_COMPLIANCE];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No GDPR / CCPA user data deletion request instructions found.',
      help: 'Include a data subject request section on your Privacy Policy page.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 35. Real contact address
  const addressMatch = searchFileContent(
    root,
    project.routes,
    /Contact Us|support@|Suite|Street|Building|Inc\.|LLC|Postal/i
  );
  if (!addressMatch.found) {
    const rule = ALL_RULES[RULE_IDS.REAL_CONTACT_ADDRESS];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'No physical business contact address or official support contact email found.',
      help: 'Add company address and support email in the footer or /contact page.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 36. Email deliverability (SPF / DKIM / DMARC)
  const emailSenderMatch = searchFileContent(
    root,
    ['package.json', ...project.routes],
    /resend|nodemailer|sendgrid|postmark|mailgun|aws-sdk/i
  );
  const spfDocMatch = searchFileContent(
    root,
    ['README.md', 'docs/email.md'],
    /SPF|DKIM|DMARC/i
  );
  if (emailSenderMatch.found && !spfDocMatch.found) {
    const rule = ALL_RULES[RULE_IDS.EMAIL_SPF_DKIM_DMARC];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'Transactional email provider detected but DNS SPF/DKIM/DMARC records are undocumented.',
      help: 'Document SPF, DKIM, and DMARC DNS settings to ensure maximum email deliverability.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  // 37. Working unsubscribe link
  const newsletterMatch = searchFileContent(
    root,
    project.routes,
    /newsletter|subscribe|email-list/i
  );
  const unsubscribeMatch = searchFileContent(
    root,
    project.routes,
    /unsubscribe|opt-out/i
  );
  if (newsletterMatch.found && !unsubscribeMatch.found) {
    const rule = ALL_RULES[RULE_IDS.WORKING_UNSUBSCRIBE_LINK];
    diagnostics.push({
      ruleId: rule.id,
      ruleNumber: rule.number,
      categoryId: rule.categoryId,
      severity: rule.severity,
      title: rule.title,
      message: 'Newsletter submission detected without matching unsubscribe route or link.',
      help: 'Create `/unsubscribe` route for subscribers to manage email preferences.',
      fixBlueprint: rule.fixBlueprint,
    });
  }

  return diagnostics;
}
