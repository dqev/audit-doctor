"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Copy } from "reicon-react";

type PkgManager = "npx" | "pnpm" | "yarn" | "bun";

const COMMANDS: Record<PkgManager, { command: string; icon: string; label: string }> = {
  npx: {
    command: "npx -y audit-doctor@latest .",
    icon: "/assets/npm.svg",
    label: "npm",
  },
  pnpm: {
    command: "pnpm dlx audit-doctor .",
    icon: "/assets/pnpm.svg",
    label: "pnpm",
  },
  yarn: {
    command: "yarn dlx audit-doctor .",
    icon: "/assets/yarn.svg",
    label: "yarn",
  },
  bun: {
    command: "bunx audit-doctor .",
    icon: "/assets/bun.svg",
    label: "bun",
  },
};

export default function Home() {
  const [activePkg, setActivePkg] = useState<PkgManager>("npx");
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedAgentCmd, setCopiedAgentCmd] = useState(false);
  const [copiedCategoryCmd, setCopiedCategoryCmd] = useState(false);
  const [copiedScoreCmd, setCopiedScoreCmd] = useState(false);

  const activeCommand = COMMANDS[activePkg].command;
  const agentCommand = "npx audit-doctor@latest . --report --agent-prompt --skill";
  const categoryCommand = "npx audit-doctor@latest . --category seo-metadata";
  const scoreCommand = "npx audit-doctor@latest . --score-only";

  const handleCopy = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-white/20 selection:text-white flex flex-col justify-center items-center py-16 px-6">
      <main className="max-w-2xl w-full mx-auto my-auto">
        {/* Title Header Block */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4 justify-center">
            <Image
              src="/assets/logo.webp"
              alt="Audit Doctor Logo"
              width={28}
              height={28}
              className="w-7 h-7 object-contain"
            />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Audit Doctor
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-white/60 font-medium max-w-lg mx-auto leading-relaxed">
            <code className="bg-[#1c1c1c] text-white/80 px-2 py-0.5 rounded-[6px] font-mono text-[11px] mr-1.5">
              audit-doctor
            </code>
            — Audit 39 production readiness standards & command AI agents to fix findings.
          </p>
        </div>

        {/* Section 1: Quick Scan Command */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-white/90 mb-1">Quick Audit Scan</h2>
          <p className="text-xs text-white/50 mb-3">
            Run an instant production readiness audit across 39 standards using your preferred package manager.
          </p>

          <div className="bg-[#1c1c1c] rounded-[18px] p-4 relative">
            {/* Tab Bar + Copy Button */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
              <div className="flex items-center gap-1.5">
                {(["npx", "pnpm", "yarn", "bun"] as PkgManager[]).map((pkg) => {
                  const isActive = activePkg === pkg;
                  return (
                    <button
                      key={pkg}
                      onClick={() => setActivePkg(pkg)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition font-medium ${
                        isActive
                          ? "bg-white text-black font-semibold"
                          : "text-white/50 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Image
                        src={COMMANDS[pkg].icon}
                        alt={pkg}
                        width={12}
                        height={12}
                        className="w-3 h-3 object-contain"
                      />
                      <span>{pkg}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handleCopy(activeCommand, setCopiedCmd)}
                title="Copy command"
                className="text-white/40 hover:text-white transition p-1.5 rounded-full hover:bg-white/5 active:scale-95"
              >
                {copiedCmd ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Command Text Line */}
            <div className="py-1 px-1 flex items-center gap-2">
              <span className="text-white/30 font-mono text-xs select-none">$</span>
              <code className="font-mono text-xs sm:text-sm text-white/90 overflow-x-auto whitespace-nowrap">
                {activeCommand}
              </code>
            </div>
          </div>
        </section>

        {/* Section 2: AI Agent Directive Command */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-white/90 mb-1">AI Agent Fix Directive & Skill</h2>
          <p className="text-xs text-white/50 mb-3">
            Generate <code className="text-white/70 font-mono">AGENTS.md</code>, <code className="text-white/70 font-mono">AUDIT_REPORT.md</code>, and <code className="text-white/70 font-mono">SKILL.md</code> for AI Coding Agents.
          </p>

          <div className="bg-[#1c1c1c] rounded-[18px] p-4 relative">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto min-w-0">
                <span className="text-white/30 font-mono text-xs select-none">$</span>
                <code className="font-mono text-xs text-white/80 truncate">
                  {agentCommand}
                </code>
              </div>

              <button
                onClick={() => handleCopy(agentCommand, setCopiedAgentCmd)}
                title="Copy agent command"
                className="text-white/40 hover:text-white transition p-1.5 rounded-full hover:bg-white/5 active:scale-95 shrink-0"
              >
                {copiedAgentCmd ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </section>

        {/* Section 3: Addon Usage Commands */}
        <section className="mb-12">
          <h2 className="text-sm font-semibold text-white/90 mb-1">Addon Commands</h2>
          <p className="text-xs text-white/50 mb-3">
            Filter by domain categories or extract health scores for CI/CD gates.
          </p>

          <div className="space-y-3">
            {/* Category Filter */}
            <div className="bg-[#1c1c1c] rounded-[18px] p-4 relative">
              <div className="text-[11px] text-white/40 font-mono mb-1">Category Filter</div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 overflow-x-auto min-w-0">
                  <span className="text-white/30 font-mono text-xs select-none">$</span>
                  <code className="font-mono text-xs text-white/80 truncate">
                    {categoryCommand}
                  </code>
                </div>

                <button
                  onClick={() => handleCopy(categoryCommand, setCopiedCategoryCmd)}
                  title="Copy category command"
                  className="text-white/40 hover:text-white transition p-1.5 rounded-full hover:bg-white/5 active:scale-95 shrink-0"
                >
                  {copiedCategoryCmd ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Score Only CI Mode */}
            <div className="bg-[#1c1c1c] rounded-[18px] p-4 relative">
              <div className="text-[11px] text-white/40 font-mono mb-1">CI/CD Score Gate Mode</div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 overflow-x-auto min-w-0">
                  <span className="text-white/30 font-mono text-xs select-none">$</span>
                  <code className="font-mono text-xs text-white/80 truncate">
                    {scoreCommand}
                  </code>
                </div>

                <button
                  onClick={() => handleCopy(scoreCommand, setCopiedScoreCmd)}
                  title="Copy score command"
                  className="text-white/40 hover:text-white transition p-1.5 rounded-full hover:bg-white/5 active:scale-95 shrink-0"
                >
                  {copiedScoreCmd ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 gap-3">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/dqev/audit-doctor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/audit-doctor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition"
            >
              NPM
            </a>
            <a
              href="https://x.com/devchauhann3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition"
            >
              X (Twitter)
            </a>
          </div>

          <p>MIT License</p>
        </footer>
      </main>
    </div>
  );
}
