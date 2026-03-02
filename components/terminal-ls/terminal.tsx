"use client";

import Link from "next/link";
import { MillifyLogoIcon } from "@/components/millify-logo";
import { TerminalLsRow } from "./terminal-ls-row";
import {
  type LsEntry,
  type LsSection,
  lsEntryDisplayName,
  lsEntryIsDirStyle,
} from "@/lib/terminal-ls-data";

export interface TerminalProps {
  /** Single flat list (one ls output). Used when sections not provided. */
  entries?: LsEntry[];
  /** Multiple cd + ls sections (e.g. cd pages → ls, cd ../projects → ls). */
  sections?: LsSection[];
  /** Optional prompt line above first listing (e.g. "ls -lah") */
  prompt?: string;
  /** Optional title in the terminal header (e.g. "ssh user@host") */
  title?: string;
  /** When true, show plain `ls` output (names only, flex wrap) for small screens. */
  compact?: boolean;
  /** When true, use compact header on tiny: no title text, logo in header instead (replaces "ssh root@..."). */
  hideHeaderLogo?: boolean;
  /** When true, show ls -o style (omit group column) for medium screens. */
  hideGroup?: boolean;
}

const PROMPT_PREFIX = "~ ";
const PROMPT_ARROW = "❯";
const PROMPT = (
  <>
    <span className="text-primary">{PROMPT_PREFIX}</span>
    <span className="text-emerald-500">{PROMPT_ARROW}</span>
  </>
);
/** Prompt with optional pwd (e.g. ~/pages ❯) instead of ~ ❯ on the same line. */
function promptWithPath(pwd?: string) {
  const prefix = pwd != null ? `${pwd} ` : PROMPT_PREFIX;
  return (
    <>
      <span className="text-primary">{prefix}</span>
      <span className="text-emerald-500">{PROMPT_ARROW}</span>
    </>
  );
}
const DEFAULT_TITLE = "ssh root@millify.dev";
/** Same height for every terminal body line. Small/medium: smaller; large: normal. */
const BODY_ROW_CLASS = "flex h-7 lg:h-8 items-center";

export function Terminal({
  entries: entriesProp,
  sections: sectionsProp,
  prompt: promptProp,
  title = DEFAULT_TITLE,
  compact = false,
  hideHeaderLogo = false,
  hideGroup = false,
}: TerminalProps) {
  const hasSections = sectionsProp && sectionsProp.length > 0;
  const sections = hasSections
    ? sectionsProp!
    : entriesProp
      ? [{ cdCommand: "", entries: entriesProp }]
      : [];

  return (
    <div className="terminal-shell w-[315px] max-w-[315px] min-[480px]:w-max min-[480px]:max-w-[900px] overflow-hidden rounded-xl border-0 outline-none">
      {/* Terminal header – flex: left = 3 buttons (+ title on larger), right = logo; justify-between, width follows screen */}
      <div className={`terminal-shell-header flex w-full min-h-7 lg:min-h-8 flex-row items-center justify-between py-0 ${hideHeaderLogo ? "px-4" : "px-4 lg:px-6"}`}>
        <div className="flex min-w-0 flex-1 items-center gap-1.5 lg:gap-2">
          <span className="size-2 lg:size-2.5 shrink-0 rounded-full bg-red-500/80" aria-hidden />
          <span className="size-2 lg:size-2.5 shrink-0 rounded-full bg-amber-500/80" aria-hidden />
          <span className="size-2 lg:size-2.5 shrink-0 rounded-full bg-emerald-500/80" aria-hidden />
          {!hideHeaderLogo && (
            <span className="ml-1.5 lg:ml-2 min-w-0 truncate font-mono text-[11px] lg:text-xs text-muted-foreground">{title}</span>
          )}
        </div>
        <div className={`flex shrink-0 items-center relative top-[-2px] ${hideHeaderLogo ? "min-w-[28px] min-[360px]:min-w-[32px] min-[400px]:min-w-[36px] justify-end" : "justify-end"}`}>
          {hideHeaderLogo ? (
            <div className="origin-right scale-[0.45] min-[360px]:scale-[0.5] min-[400px]:scale-[0.55]">
              <MillifyLogoIcon />
            </div>
          ) : (
            <div className="origin-right scale-[0.5] lg:scale-[0.58]">
              <MillifyLogoIcon />
            </div>
          )}
        </div>
      </div>

      {/* Terminal body – smaller on tiny/small/medium; normal on large */}
      <div className="overflow-x-auto py-3 lg:py-4 font-mono text-xs lg:text-sm">
        <div className={`${compact ? "flex flex-col gap-y-3 px-4" : "px-4 lg:px-6 min-w-max min-[480px]:w-max"}`}>
        {sections.map((section, sectionIndex) => {
          const showPrompt = section.cdCommand.length > 0;
          return (
            <div key={sectionIndex} className={`${sectionIndex > 0 && !compact ? "mt-0" : ""} ${compact ? "flex flex-col gap-y-3" : ""}`}>
              {showPrompt && (
                <div className={`${BODY_ROW_CLASS} gap-2 text-muted-foreground`}>
                  {PROMPT}
                  <span>{section.cdCommand}</span>
                </div>
              )}
              {!showPrompt && promptProp != null && (
                <div className={`${BODY_ROW_CLASS} gap-2 text-muted-foreground`}>
                  {PROMPT}
                  <span>{promptProp}</span>
                </div>
              )}
              {compact ? (
                <div className={`flex min-h-7 lg:min-h-8 flex-wrap items-center gap-x-2 gap-y-0.5 lg:gap-y-1 text-muted-foreground`}>
                  {promptWithPath(section.pwd)}
                  <span>ls</span>
                  <span className={`ml-auto inline-flex flex-wrap items-baseline justify-end ${section.pwd === "~/projects" ? "" : "gap-x-1.5 lg:gap-x-2"} gap-y-0.5 lg:gap-y-1`}>
                    {section.entries.map((entry, i) => {
                      const isProjectsDir = section.pwd === "~/projects" && lsEntryIsDirStyle(entry);
                      const isLast = i === section.entries.length - 1;
                      const spacingClass = section.pwd === "~/projects" && !isLast ? "mr-6" : "";
                      const nameClass = lsEntryIsDirStyle(entry)
                        ? isProjectsDir
                          ? "text-foreground font-medium"
                          : "text-primary font-medium"
                        : "text-foreground";
                      const name = lsEntryDisplayName(entry);
                      if (entry.type === "file") {
                        return (
                          <Link
                            key={`${sectionIndex}-${entry.name}-${i}`}
                            href={entry.href}
                            className={`${nameClass} ${spacingClass} underline underline-offset-2 focus:outline-none rounded`}
                          >
                            {name}
                          </Link>
                        );
                      }
                      return (
                        <span key={`${sectionIndex}-${entry.name}-${i}`} className={`${nameClass} ${spacingClass}`}>
                          {name}
                        </span>
                      );
                    })}
                  </span>
                </div>
              ) : (
                <>
                  {showPrompt && (
                    <div className={`${BODY_ROW_CLASS} gap-2 text-muted-foreground`}>
                      {promptWithPath(section.pwd)}
                      <span>{hideGroup ? "ls -o" : "ls -lh"}</span>
                    </div>
                  )}
                  <div className={`${BODY_ROW_CLASS} gap-3 text-muted-foreground`}>
                    <span className="shrink-0 tabular-nums">total 8.0K</span>
                  </div>
                  {section.entries.map((entry, i) => (
                    <TerminalLsRow
                      key={`${sectionIndex}-${entry.name}-${i}`}
                      entry={entry}
                      nameColor={section.pwd === "~/projects" ? "foreground" : "primary"}
                      hideGroup={hideGroup}
                    />
                  ))}
                </>
              )}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
