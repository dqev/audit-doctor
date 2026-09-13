export type Framework =
  | 'nextjs-app'
  | 'nextjs-pages'
  | 'react'
  | 'vite'
  | 'remix'
  | 'astro'
  | 'svelte'
  | 'vue'
  | 'html'
  | 'unknown';

export interface ProjectInfo {
  rootDirectory: string;
  projectName: string;
  framework: Framework;
  hasTypeScript: boolean;
  sourceFileCount: number;
  packageJson: PackageJson | null;
  routes: string[];
  publicFiles: string[];
}

export interface PackageJson {
  name?: string;
  version?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  scripts?: Record<string, string>;
}

export type Severity = 'error' | 'warning';

export type CategoryId =
  | 'pages-routing'
  | 'seo-metadata'
  | 'accessibility-content'
  | 'ux-responsiveness'
  | 'performance'
  | 'security-infra'
  | 'compliance-trust'
  | 'analytics-qa';

export interface CategoryInfo {
  id: CategoryId;
  title: string;
  description: string;
}

export interface AgentFixBlueprint {
  title: string;
  targetFiles: string[];
  summary: string;
  steps: string[];
  codeTemplate?: string;
}

export interface RuleDefinition {
  id: string;
  number: number;
  categoryId: CategoryId;
  title: string;
  description: string;
  severity: Severity;
  weight: number;
  fixBlueprint: AgentFixBlueprint;
}

export interface Diagnostic {
  ruleId: string;
  ruleNumber: number;
  categoryId: CategoryId;
  severity: Severity;
  title: string;
  message: string;
  help: string;
  filePath?: string;
  line?: number;
  column?: number;
  fixBlueprint: AgentFixBlueprint;
}

export interface CategoryScore {
  categoryId: CategoryId;
  title: string;
  passedCount: number;
  totalCount: number;
  percentage: number;
}

export interface ScoreResult {
  overallScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  label: string;
  categoryScores: CategoryScore[];
  totalDiagnostics: number;
  errorCount: number;
  warningCount: number;
}

export interface ScanResult {
  projectInfo: ProjectInfo;
  diagnostics: Diagnostic[];
  passedRules: RuleDefinition[];
  scoreResult: ScoreResult;
  timestamp: string;
}

export interface ScanOptions {
  cwd?: string;
  output?: 'terminal' | 'json' | 'markdown' | 'silent';
  category?: CategoryId;
  generateReport?: boolean;
  reportPath?: string;
  generateAgentPrompt?: boolean;
  agentPromptPath?: string;
  generateSkill?: boolean;
  skillPath?: string;
  verbose?: boolean;
}
