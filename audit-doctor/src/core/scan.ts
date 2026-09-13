import fs from 'node:fs';
import path from 'node:path';
import { ScanOptions, ScanResult } from './types.js';
import { discoverProject } from '../project/discover-project.js';
import { runAllAudits } from '../audits/index.js';
import { calculateScore } from '../reporting/calculate-score.js';
import { generateMarkdownReport } from '../reporting/generate-report.js';
import { generateAgentPrompt, generateSkillMarkdown } from '../reporting/generate-agent-instructions.js';
import { renderTerminalUi } from '../ui/terminal.js';
import { AGENT_PROMPT_FILENAME, REPORT_FILENAME, SKILL_FILENAME } from './constants.js';

export async function runAuditScan(options: ScanOptions = {}): Promise<ScanResult> {
  const cwd = options.cwd ? path.resolve(options.cwd) : process.cwd();
  const project = await discoverProject(cwd);

  let diagnostics = runAllAudits(project);

  if (options.category) {
    diagnostics = diagnostics.filter((d) => d.categoryId === options.category);
  }

  const { scoreResult, passedRules } = calculateScore(diagnostics);

  const scanResult: ScanResult = {
    projectInfo: project,
    diagnostics,
    passedRules,
    scoreResult,
    timestamp: new Date().toISOString().split('T')[0],
  };

  // Terminal UI output
  if (options.output === 'terminal' || (!options.output && options.output !== 'silent')) {
    renderTerminalUi(scanResult);
  }

  // Generate Report
  if (options.generateReport || options.reportPath) {
    const reportMd = generateMarkdownReport(scanResult);
    const outPath = path.resolve(cwd, options.reportPath || REPORT_FILENAME);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, reportMd, 'utf-8');
    console.log(`\n📄 Report saved to: ${outPath}`);
  }

  // Generate AI Agent Prompts & Skills
  if (options.generateAgentPrompt || options.agentPromptPath) {
    const agentMd = generateAgentPrompt(scanResult);
    const outPath = path.resolve(cwd, options.agentPromptPath || AGENT_PROMPT_FILENAME);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, agentMd, 'utf-8');
    console.log(`🤖 AI Agent Directive saved to: ${outPath}`);
  }

  if (options.generateSkill || options.skillPath) {
    const skillMd = generateSkillMarkdown(scanResult);
    const outPath = path.resolve(cwd, options.skillPath || SKILL_FILENAME);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, skillMd, 'utf-8');
    console.log(`⚡ AI Agent Fixer Skill saved to: ${outPath}`);
  }

  return scanResult;
}
