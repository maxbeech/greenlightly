"use client";
import { useState } from "react";

export function CopyLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="rounded-md border border-line-strong px-2.5 py-1 text-xs font-medium text-ink-soft transition-colors hover:border-ink-faint hover:bg-paper"
    >
      {copied ? "Copied!" : "Copy link"}
    </button>
  );
}
