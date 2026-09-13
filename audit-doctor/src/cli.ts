#!/usr/bin/env node
import { Command } from 'commander';
import { runAuditScan } from './core/scan.js';
import { PACKAGE_NAME, PACKAGE_VERSION } from './core/constants.js';
import { CategoryId } from './core/types.js';

const program = new Command();

program
  .name(PACKAGE_NAME)
  .description('Audit modern web apps across 39 production-readiness criteria & generate AI agent fixer directives')
  .version(PACKAGE_VERSION, '-v, --version');

program
  .command('scan [directory]', { isDefault: true })
  .description('Target codebase directory to audit')
  .option('-r, --report [path]', 'Generate Markdown report file', false)
  .option('-a, --agent-prompt [path]', 'Generate AGENTS.md prompt directive file for AI agents', false)
  .option('-s, --skill [path]', 'Generate .agents/skills/audit-fixer/SKILL.md skill file', false)
  .option('-j, --json', 'Output results as JSON', false)
  .option('-c, --category <category>', 'Filter audit checks by category ID')
  .option('--score-only', 'Output only the numeric health score (0-100)', false)
  .action(async (directory = '.', options) => {
    try {
      const scanOptions = {
        cwd: directory,
        output: options.scoreOnly ? ('silent' as const) : options.json ? ('json' as const) : ('terminal' as const),
        category: options.category as CategoryId | undefined,
        generateReport: options.report !== false,
        reportPath: typeof options.report === 'string' ? options.report : undefined,
        generateAgentPrompt: options.agentPrompt !== false,
        agentPromptPath: typeof options.agentPrompt === 'string' ? options.agentPrompt : undefined,
        generateSkill: options.skill !== false,
        skillPath: typeof options.skill === 'string' ? options.skill : undefined,
      };

      const result = await runAuditScan(scanOptions);

      if (options.scoreOnly) {
        console.log(result.scoreResult.overallScore);
        process.exit(0);
      }

      if (options.json) {
        console.log(JSON.stringify(result, null, 2));
      }
    } catch (err: any) {
      console.error('Audit Doctor encountered an error:', err?.message || err);
      process.exit(1);
    }
  });

program.parse(process.argv);
