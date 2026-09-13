import pc from 'picocolors';
import { Diagnostic, ScanResult } from '../core/types.js';

export function renderTerminalUi(result: ScanResult): void {
  const { projectInfo, diagnostics, passedRules, scoreResult } = result;

  console.log('');
  console.log(pc.cyan(pc.bold('========================================================================')));
  console.log(pc.cyan(pc.bold('   🏥 AUDIT DOCTOR — Web Application Production Readiness Scanner')));
  console.log(pc.cyan(pc.bold('========================================================================')));
  console.log('');
  console.log(` Target:     ${pc.bold(projectInfo.projectName)} (${pc.dim(projectInfo.rootDirectory)})`);
  console.log(` Framework:  ${pc.magenta(projectInfo.framework)}`);
  console.log(` Files:      ${projectInfo.sourceFileCount} source files inspected`);
  console.log('');

  // Render Score Banner
  const score = scoreResult.overallScore;
  let scoreColor = pc.green;
  if (score < 60) scoreColor = pc.red;
  else if (score < 85) scoreColor = pc.yellow;

  console.log(pc.bold('------------------------------------------------------------------------'));
  console.log(`  Health Score:   ${scoreColor(pc.bold(`${score}/100`))}  Grade: ${scoreColor(pc.bold(`[${scoreResult.grade}]`))}`);
  console.log(`  Status:         ${scoreColor(scoreResult.label)}`);
  console.log(`  Evaluated:      39 Production Checklist Items`);
  console.log(`  Summary:        ${pc.green(`✅ ${passedRules.length} Passed`)} | ${pc.red(`❌ ${scoreResult.errorCount} Errors`)} | ${pc.yellow(`⚠️ ${scoreResult.warningCount} Warnings`)}`);
  console.log(pc.bold('------------------------------------------------------------------------'));
  console.log('');

  // Render Category Breakdown Table
  console.log(pc.bold('📋 Category Health Scores:'));
  for (const cat of scoreResult.categoryScores) {
    const icon = cat.percentage >= 80 ? pc.green('🟢') : cat.percentage >= 50 ? pc.yellow('🟡') : pc.red('🔴');
    const bar = renderProgressBar(cat.percentage);
    console.log(`  ${icon} ${cat.title.padEnd(26)} ${bar} ${cat.passedCount}/${cat.totalCount} (${cat.percentage}%)`);
  }
  console.log('');

  // Render Diagnostics
  if (diagnostics.length > 0) {
    console.log(pc.bold(pc.red(`🚨 Failed Audits (${diagnostics.length}):`)));
    console.log('');

    diagnostics.forEach((d, idx) => {
      const badge = d.severity === 'error' ? pc.bgRed(pc.white(pc.bold(' ERROR '))) : pc.bgYellow(pc.black(pc.bold(' WARN ')));
      console.log(` ${badge} ${pc.bold(`Check #${d.ruleNumber}: ${d.title}`)}`);
      console.log(`    ${pc.dim('Message:')} ${d.message}`);
      if (d.filePath) {
        console.log(`    ${pc.dim('File:')}    ${pc.cyan(d.filePath)}`);
      }
      console.log(`    ${pc.dim('Fix:')}     ${pc.green(d.help)}`);
      console.log('');
    });
  } else {
    console.log(pc.green(pc.bold('🎉 Perfect Score! All 39 production readiness criteria passed cleanly.')));
    console.log('');
  }

  console.log(pc.cyan(pc.bold('========================================================================')));
}

function renderProgressBar(percentage: number): string {
  const width = 15;
  const filled = Math.round((percentage / 100) * width);
  const empty = width - filled;
  const fillChar = '█';
  const emptyChar = '░';

  if (percentage >= 80) return pc.green(fillChar.repeat(filled) + emptyChar.repeat(empty));
  if (percentage >= 50) return pc.yellow(fillChar.repeat(filled) + emptyChar.repeat(empty));
  return pc.red(fillChar.repeat(filled) + emptyChar.repeat(empty));
}
