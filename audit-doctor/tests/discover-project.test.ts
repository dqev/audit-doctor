import { describe, expect, it } from 'vitest';
import path from 'node:path';
import { discoverProject } from '../src/project/discover-project.js';

describe('discoverProject', () => {
  it('should inspect project directory and detect framework and files', async () => {
    const project = await discoverProject(process.cwd());
    expect(project).toBeDefined();
    expect(project.projectName).toBe('audit-doctor');
    expect(project.hasTypeScript).toBe(true);
    expect(project.sourceFileCount).toBeGreaterThan(0);
  });
});
