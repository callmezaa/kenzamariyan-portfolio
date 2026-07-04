"use client";

import { useReducedMotion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language: string;
  filename: string;
  highlightLines?: number[];
}

interface Token {
  text: string;
  className?: string;
}

const KEYWORDS =
  /\b(import|export|from|const|let|var|function|return|if|else|for|while|class|interface|type|extends|implements|async|await|new|try|catch|throw|true|false|null|undefined|package|func|def|defn|in|of|as|switch|case|default|break|continue|yield|this|super|static|private|public|protected|readonly|enum|namespace|module|declare|abstract)\b/;

const TYPES =
  /\b(string|number|boolean|void|Promise|ReactNode|JSX\.Element|Record|Partial|Required|Pick|Omit|Exclude|Extract|NonNullable|ReturnType|Parameters|Readonly|Int\d+|Uint\d+|float64|float32|int64|error|any|unknown|never)\b/;

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let remaining = line;

  while (remaining.length > 0) {
    let matched = false;

    const stringPatterns: [RegExp, string][] = [
      [/^("(?:[^"\\]|\\.)*")/, "text-emerald-400"],
      [/^('(?:[^'\\]|\\.)*')/, "text-emerald-400"],
      [/^(`(?:[^`\\]|\\.)*`)/, "text-emerald-400"],
    ];

    for (const [regex, cls] of stringPatterns) {
      const m = remaining.match(regex);
      if (m) {
        tokens.push({ text: m[1], className: cls });
        remaining = remaining.slice(m[1].length);
        matched = true;
        break;
      }
    }
    if (matched) continue;

    const cm = remaining.match(/^(\/\/.*)/);
    if (cm) {
      tokens.push({ text: cm[1], className: "text-zinc-600 italic" });
      remaining = remaining.slice(cm[1].length);
      continue;
    }

    const num = remaining.match(/^(\b\d+\.?\d*\b)/);
    if (num) {
      tokens.push({ text: num[1], className: "text-amber-400" });
      remaining = remaining.slice(num[1].length);
      continue;
    }

    const kw = remaining.match(KEYWORDS);
    if (kw && kw.index === 0) {
      tokens.push({ text: kw[1], className: "text-purple-400" });
      remaining = remaining.slice(kw[1].length);
      continue;
    }

    const tp = remaining.match(TYPES);
    if (tp && tp.index === 0) {
      tokens.push({ text: tp[1], className: "text-cyan-400" });
      remaining = remaining.slice(tp[1].length);
      continue;
    }

    tokens.push({ text: remaining[0] });
    remaining = remaining.slice(1);
  }

  return tokens;
}

export default function CodeBlock({ code, filename, highlightLines = [] }: CodeBlockProps) {
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const lines = code.split("\n");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
      {/* Window toolbar */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="ml-2 text-[11px] font-medium text-zinc-500 font-mono">{filename}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-medium text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code area */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, i) => {
              const highlighted = highlightLines.includes(i + 1);
              const tokens = tokenizeLine(line);
              return (
                <tr
                  key={i}
                  className={highlighted ? "bg-indigo-500/5" : undefined}
                >
                  <td className="select-none border-r border-zinc-800 px-4 py-0 text-right align-top">
                    <span
                      className={`text-[11px] font-mono leading-6 tabular-nums ${
                        highlighted ? "text-indigo-400" : "text-zinc-700"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </td>
                  <td className="w-full px-4 py-0 align-top">
                    <pre className="m-0 text-[13px] font-mono leading-6 text-zinc-300">
                      {tokens.length > 0 ? (
                        tokens.map((token, j) => (
                          <span key={j} className={token.className}>
                            {token.text}
                          </span>
                        ))
                      ) : (
                        <span className="select-none">&nbsp;</span>
                      )}
                    </pre>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
