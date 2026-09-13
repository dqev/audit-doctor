import fs from 'node:fs';
import path from 'node:path';

export function fileExists(rootDir: string, relativePath: string): boolean {
  return fs.existsSync(path.join(rootDir, relativePath));
}

export function anyFileExists(rootDir: string, relativePaths: string[]): boolean {
  return relativePaths.some((p) => fileExists(rootDir, p));
}

export function readFileContent(rootDir: string, relativePath: string): string | null {
  const fullPath = path.join(rootDir, relativePath);
  if (!fs.existsSync(fullPath)) return null;
  try {
    return fs.readFileSync(fullPath, 'utf-8');
  } catch {
    return null;
  }
}

export function searchFileContent(
  rootDir: string,
  relativeFiles: string[],
  pattern: RegExp | string
): { found: boolean; filePath?: string; match?: string } {
  for (const file of relativeFiles) {
    const content = readFileContent(rootDir, file);
    if (!content) continue;
    if (typeof pattern === 'string') {
      if (content.includes(pattern)) {
        return { found: true, filePath: file, match: pattern };
      }
    } else if (pattern instanceof RegExp) {
      pattern.lastIndex = 0; // Prevent lastIndex statefulness bug across multiple file searches
      if (pattern.test(content)) {
        return { found: true, filePath: file };
      }
    }
  }
  return { found: false };
}
