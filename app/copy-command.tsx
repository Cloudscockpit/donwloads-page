"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CopyCommand({ command, label }: { command: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex min-w-0 items-center justify-between gap-2 rounded-lg bg-secondary py-2 pr-2 pl-5">
      <code className="min-w-0 flex-1 font-mono text-[0.9375rem] break-all text-foreground">{command}</code>
      <Button variant="ghost" size="icon-lg" className="size-11" onClick={copy} aria-label={copied ? "Copied" : label}>
        {copied ? <Check /> : <Copy />}
      </Button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}
