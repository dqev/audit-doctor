import { ScanResult } from '../core/types.js';

export function generateAgentPrompt(result: ScanResult): string {
  const { projectInfo, diagnostics, scoreResult } = result;

  let prompt = `# 🤖 AI AGENT DIRECTIVE — Fix Audit Doctor Findings for ${projectInfo.projectName}\n\n`;
  prompt += `> **ATTENTION AI AGENT (Antigravity / Cursor / Claude Code / Windsurf)**\n`;
  prompt += `> You are tasked with resolving all failed production-readiness audits detected by Audit Doctor.\n`;
  prompt += `> Current Health Score: **${scoreResult.overallScore}/100** | Failed Audits: **${diagnostics.length}** (${scoreResult.errorCount} Errors, ${scoreResult.warningCount} Warnings).\n\n`;

  prompt += `## Project Environment Context\n`;
  prompt += `- **Target Directory:** \`${projectInfo.rootDirectory}\`\n`;
  prompt += `- **Framework:** \`${projectInfo.framework}\`\n`;
  prompt += `- **TypeScript Enabled:** ${projectInfo.hasTypeScript ? 'Yes' : 'No'}\n\n`;

  prompt += `## Step-by-Step AI Agent Execution Plan\n\n`;
  prompt += `Execute each of the following task items sequentially. Verify each file created or updated before moving to the next task.\n\n`;

  diagnostics.forEach((d, idx) => {
    prompt += `### Task ${idx + 1}/${diagnostics.length}: Fix [Check #${d.ruleNumber}] ${d.title}\n`;
    prompt += `- **Severity:** ${d.severity.toUpperCase()}\n`;
    prompt += `- **Diagnostic Message:** ${d.message}\n`;
    if (d.filePath) {
      prompt += `- **Target File:** \`${d.filePath}\`\n`;
    }
    prompt += `- **Remediation Blueprint:** ${d.fixBlueprint.summary}\n`;
    prompt += `- **Implementation Steps:**\n`;
    d.fixBlueprint.steps.forEach((step) => {
      prompt += `  1. ${step}\n`;
    });
    if (d.fixBlueprint.codeTemplate) {
      prompt += `\n**Reference Code Implementation:**\n\`\`\`tsx\n${d.fixBlueprint.codeTemplate}\n\`\`\`\n`;
    }
    prompt += `\n---\n\n`;
  });

  prompt += `## Final Verification Command\n`;
  prompt += `Once all tasks are finished, run the audit doctor command to verify all items are resolved:\n`;
  prompt += `\`\`\`bash\nnpx audit-doctor scan .\n\`\`\`\n`;

  return prompt;
}

export function generateSkillMarkdown(result: ScanResult): string {
  const { projectInfo, diagnostics, scoreResult } = result;

  let skill = `---
name: audit-fixer
description: Skill for AI agents to automatically fix all failing Audit Doctor production readiness checks in ${projectInfo.projectName}.
---

# Audit Fixer Skill Instructions

Use this skill when tasked to automatically fix failed production-readiness audits for **${projectInfo.projectName}** (${projectInfo.framework}).

Current Audit Score: **${scoreResult.overallScore}/100** Grade **${scoreResult.grade}**
Remaining Failed Audits: **${diagnostics.length}**

## Action Blueprint

`;

  diagnostics.forEach((d, idx) => {
    skill += `### ${idx + 1}. Fix Check #${d.ruleNumber}: ${d.title}\n`;
    skill += `- **File target:** ${d.filePath || d.fixBlueprint.targetFiles[0] || 'See project routes'}\n`;
    skill += `- **Action:** ${d.fixBlueprint.summary}\n`;
    skill += `- **Steps:**\n`;
    d.fixBlueprint.steps.forEach((step) => {
      skill += `  - ${step}\n`;
    });
    if (d.fixBlueprint.codeTemplate) {
      skill += `\n\`\`\`tsx\n${d.fixBlueprint.codeTemplate}\n\`\`\`\n`;
    }
    skill += `\n`;
  });

  skill += `## Completion Criteria
Run \`npx audit-doctor scan .\` and verify health score reaches **100/100** with 0 errors.
`;

  return skill;
}
