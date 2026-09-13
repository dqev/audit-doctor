import { describe, expect, it } from 'vitest';
import { runAuditScan } from '../src/core/scan.js';
import { generateMarkdownReport } from '../src/reporting/generate-report.js';
import { generateAgentPrompt, generateSkillMarkdown } from '../src/reporting/generate-agent-instructions.js';

describe('reporting generators', () => {
  it('should generate valid markdown report, agent prompt, and skill file', async () => {
    const result = await runAuditScan({ cwd: process.cwd(), output: 'json' });

    const mdReport = generateMarkdownReport(result);
    expect(mdReport).toContain('# 🏥 Audit Doctor Report');
    expect(mdReport).toContain('Category Breakdown');

    const agentPrompt = generateAgentPrompt(result);
    expect(agentPrompt).toContain('AI AGENT DIRECTIVE');
    expect(agentPrompt).toContain('Step-by-Step AI Agent Execution Plan');

    const skillMd = generateSkillMarkdown(result);
    expect(skillMd).toContain('name: audit-fixer');
  });
});
