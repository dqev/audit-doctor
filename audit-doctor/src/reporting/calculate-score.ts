import { CategoryId, CategoryScore, Diagnostic, RuleDefinition, ScoreResult } from '../core/types.js';
import { CATEGORIES } from '../core/rule-ids.js';
import { ALL_RULES } from '../core/rule-definitions.js';

export function calculateScore(diagnostics: Diagnostic[]): {
  scoreResult: ScoreResult;
  passedRules: RuleDefinition[];
} {
  const failedRuleIds = new Set(diagnostics.map((d) => d.ruleId));
  const allRulesList = Object.values(ALL_RULES);
  const passedRules = allRulesList.filter((r) => !failedRuleIds.has(r.id));

  // Compute category scores
  const categoryIds = Object.keys(CATEGORIES) as CategoryId[];
  const categoryScores: CategoryScore[] = categoryIds.map((catId) => {
    const catRules = allRulesList.filter((r) => r.categoryId === catId);
    const catFailed = diagnostics.filter((d) => d.categoryId === catId);
    const passedCount = catRules.length - catFailed.length;
    const percentage = catRules.length > 0 ? Math.round((passedCount / catRules.length) * 100) : 100;

    return {
      categoryId: catId,
      title: CATEGORIES[catId].title,
      passedCount,
      totalCount: catRules.length,
      percentage,
    };
  });

  // Calculate weighted overall score (0 - 100)
  const totalPossibleWeight = allRulesList.reduce((acc, r) => acc + r.weight, 0);
  const totalDeductedWeight = diagnostics.reduce((acc, d) => {
    const rule = ALL_RULES[d.ruleId];
    return acc + (rule ? rule.weight : 2);
  }, 0);

  const rawScore = Math.max(0, Math.min(100, Math.round(((totalPossibleWeight - totalDeductedWeight) / totalPossibleWeight) * 100)));

  let grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' = 'F';
  let label = 'Needs Critical Attention';

  if (rawScore >= 95) {
    grade = 'A+';
    label = 'Production Ready & Fully Compliant';
  } else if (rawScore >= 85) {
    grade = 'A';
    label = 'Excellent (Minor tweaks remaining)';
  } else if (rawScore >= 75) {
    grade = 'B';
    label = 'Good (Needs secondary enhancements)';
  } else if (rawScore >= 60) {
    grade = 'C';
    label = 'Fair (Missing core production pages & meta)';
  } else if (rawScore >= 45) {
    grade = 'D';
    label = 'Subpar (Significant compliance gaps)';
  }

  const errorCount = diagnostics.filter((d) => d.severity === 'error').length;
  const warningCount = diagnostics.filter((d) => d.severity === 'warning').length;

  return {
    scoreResult: {
      overallScore: rawScore,
      grade,
      label,
      categoryScores,
      totalDiagnostics: diagnostics.length,
      errorCount,
      warningCount,
    },
    passedRules,
  };
}
