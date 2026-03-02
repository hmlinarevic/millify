"use client";

import { useEffect, useState } from "react";
import { Terminal } from "@/components/terminal-ls";
import type { LsSection } from "@/lib/terminal-ls-data";

/** Very small: logo above terminal, simple ls -R. Small/medium: ls -o. Large: ls -lh with group. */
const LOGO_OUTSIDE_MAX_WIDTH = 480;
const LARGE_MIN_WIDTH = 1024; // Tailwind lg – full ls -lh with group column

export function TerminalView({ sections }: { sections: LsSection[] }) {
  const [layoutReady, setLayoutReady] = useState(false);
  const [showLogoOutside, setShowLogoOutside] = useState(true);
  const [compact, setCompact] = useState(true);
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const mqlLogo = window.matchMedia(`(max-width: ${LOGO_OUTSIDE_MAX_WIDTH - 1}px)`);
    const mqlLarge = window.matchMedia(`(min-width: ${LARGE_MIN_WIDTH}px)`);
    const update = () => {
      setShowLogoOutside(mqlLogo.matches);
      setCompact(mqlLogo.matches);
      setIsLarge(mqlLarge.matches);
    };
    update();
    setLayoutReady(true);
    mqlLogo.addEventListener("change", update);
    mqlLarge.addEventListener("change", update);
    return () => {
      mqlLogo.removeEventListener("change", update);
      mqlLarge.removeEventListener("change", update);
    };
  }, []);

  const terminalProps = {
    sections,
    compact,
    hideHeaderLogo: showLogoOutside,
    hideGroup: !compact && !isLarge,
  };

  if (!layoutReady) {
    return (
      <div
        className="w-full max-w-[900px] min-h-dvh overflow-hidden rounded-lg border border-border bg-muted/40 shadow-md opacity-0 pointer-events-none"
        aria-hidden
      >
        <div className="flex min-h-8 items-center justify-between gap-2 border-b border-border bg-muted/60 px-6 py-0">
          <div className="flex min-w-0 items-center gap-2">
            <span className="size-2.5 rounded-full bg-red-500/80 shrink-0" aria-hidden />
            <span className="size-2.5 rounded-full bg-amber-500/80 shrink-0" aria-hidden />
            <span className="size-2.5 rounded-full bg-emerald-500/80 shrink-0" aria-hidden />
          </div>
        </div>
        <div className="min-h-[200px] py-4" />
      </div>
    );
  }

  return (
    <div
      data-suppress-outline
      className="flex min-h-dvh w-full flex-col items-center justify-center outline-none"
    >
      <Terminal {...terminalProps} />
    </div>
  );
}
