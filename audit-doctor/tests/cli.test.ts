import { describe, expect, it } from 'vitest';
import { execSync } from 'node:child_process';
import path from 'node:path';

describe('CLI execution', () => {
  it('should run audit-doctor CLI and output JSON when --json flag is passed', () => {
    const cliPath = path.resolve(process.cwd(), 'dist/cli.mjs');
    const output = execSync(`node ${cliPath} . --json`, { encoding: 'utf-8' });
    const parsed = JSON.parse(output);

    expect(parsed).toBeDefined();
    expect(parsed.scoreResult).toBeDefined();
    expect(parsed.projectInfo.projectName).toBe('audit-doctor');
  });

  it('should run audit-doctor scan . command smoothly', () => {
    const cliPath = path.resolve(process.cwd(), 'dist/cli.mjs');
    const output = execSync(`node ${cliPath} scan . --score-only`, { encoding: 'utf-8' });
    const score = parseInt(output.trim(), 10);

    expect(Number.isNaN(score)).toBe(false);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });
});
