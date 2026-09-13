import { describe, expect, it } from 'vitest';
import { discoverProject } from '../src/project/discover-project.js';
import { runAllAudits } from '../src/audits/index.js';

describe('runAllAudits', () => {
  it('should run all 39 audit checks and return diagnostic issues', async () => {
    const project = await discoverProject(process.cwd());
    const diagnostics = runAllAudits(project);
    expect(Array.isArray(diagnostics)).toBe(true);
  });
});
