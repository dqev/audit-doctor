import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';
import { Framework, PackageJson, ProjectInfo } from '../core/types.js';

export async function discoverProject(cwd: string = process.cwd()): Promise<ProjectInfo> {
  const rootDir = path.resolve(cwd);
  const pkgPath = path.join(rootDir, 'package.json');

  let packageJson: PackageJson | null = null;
  if (fs.existsSync(pkgPath)) {
    try {
      packageJson = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    } catch {
      packageJson = null;
    }
  }

  const framework = detectFramework(rootDir, packageJson);

  // Collect source files with posix path normalization & comprehensive ignores
  const sourcePatterns = ['**/*.{js,jsx,ts,tsx,astro,svelte,vue,html}'];
  const ignorePatterns = [
    '**/node_modules/**',
    '**/node_modules',
    'node_modules/**',
    'node_modules',
    '**/dist/**',
    '**/dist',
    '**/.next/**',
    '**/.next',
    '**/build/**',
    '**/build',
    '**/.git/**',
    '**/*.d.ts',
    '**/*.min.js',
    '**/*.bundle.js',
    '**/coverage/**',
    '**/out/**',
  ];

  let sourceFiles: string[] = [];
  try {
    sourceFiles = await glob(sourcePatterns, { cwd: rootDir, ignore: ignorePatterns, nodir: true, posix: true });
  } catch {
    sourceFiles = [];
  }

  const hasTypeScript = fs.existsSync(path.join(rootDir, 'tsconfig.json')) ||
    sourceFiles.some((f) => f.endsWith('.ts') || f.endsWith('.tsx'));

  // Collect public files
  let publicFiles: string[] = [];
  try {
    const pubDir = path.join(rootDir, 'public');
    if (fs.existsSync(pubDir)) {
      publicFiles = await glob('**/*', { cwd: pubDir, nodir: true, posix: true });
    }
  } catch {
    publicFiles = [];
  }

  return {
    rootDirectory: rootDir,
    projectName: packageJson?.name || path.basename(rootDir),
    framework,
    hasTypeScript,
    sourceFileCount: sourceFiles.length,
    packageJson,
    routes: sourceFiles,
    publicFiles,
  };
}

function detectFramework(rootDir: string, pkg: PackageJson | null): Framework {
  const deps = { ...pkg?.dependencies, ...pkg?.devDependencies };

  if (fs.existsSync(path.join(rootDir, 'app')) || fs.existsSync(path.join(rootDir, 'src/app'))) {
    if (deps['next']) return 'nextjs-app';
  }

  if (fs.existsSync(path.join(rootDir, 'pages')) || fs.existsSync(path.join(rootDir, 'src/pages'))) {
    if (deps['next']) return 'nextjs-pages';
  }

  if (deps['next']) return 'nextjs-app';
  if (deps['@remix-run/react']) return 'remix';
  if (deps['astro']) return 'astro';
  if (deps['@sveltejs/kit'] || deps['svelte']) return 'svelte';
  if (deps['vue'] || deps['nuxt']) return 'vue';
  if (deps['vite']) return 'vite';
  if (deps['react']) return 'react';

  if (fs.existsSync(path.join(rootDir, 'index.html'))) return 'html';

  return 'unknown';
}
