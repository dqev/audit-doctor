import { describe, expect, it } from 'vitest';
import { calculateScore } from '../src/reporting/calculate-score.js';
import { ALL_RULES } from '../src/core/rule-definitions.js';
import { RULE_IDS } from '../src/core/rule-ids.js';
import { Diagnostic } from '../src/core/types.js';

describe('calculateScore', () => {
  it('should return 100/100 A+ when 0 diagnostics are passed', () => {
    const { scoreResult, passedRules } = calculateScore([]);
    expect(scoreResult.overallScore).toBe(100);
    expect(scoreResult.grade).toBe('A+');
    expect(passedRules.length).toBe(39);
  });

  it('should deduct score and categorize correctly when diagnostics exist', () => {
    const mockRule = ALL_RULES[RULE_IDS.CUSTOM_404];
    const mockDiagnostic: Diagnostic = {
      ruleId: mockRule.id,
      ruleNumber: mockRule.number,
      categoryId: mockRule.categoryId,
      severity: mockRule.severity,
      title: mockRule.title,
      message: 'Missing 404',
      help: 'Create 404',
      fixBlueprint: mockRule.fixBlueprint,
    };

    const { scoreResult, passedRules } = calculateScore([mockDiagnostic]);
    expect(scoreResult.overallScore).toBeLessThan(100);
    expect(passedRules.length).toBe(38);
    expect(scoreResult.errorCount).toBe(1);
  });
});
