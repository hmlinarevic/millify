import {
  lsEntrySize,
  lsEntryDate,
  lsEntryNlink,
  lsEntryDisplayName,
  lsEntryIsDirStyle,
} from "@/lib/terminal-ls-data";
import type { LsEntry } from "@/lib/terminal-ls-data";

const PERMS_DIR = "drwxrwxr-x";
const PERMS_FILE = "-rw-r--r--";
const FAKE_USER = "root";
const FAKE_GROUP = "millify";

const ROW_CLASS = "flex h-7 lg:h-8 items-center gap-x-4 lg:gap-x-6 font-mono text-xs lg:text-sm whitespace-nowrap";
const META_BASE = "shrink-0 text-muted-foreground";

function LsRowMetaCells({
  entry,
  baseClass,
  hideGroup = false,
}: {
  entry: LsEntry;
  baseClass: string;
  /** ls -o style: omit group column. */
  hideGroup?: boolean;
}) {
  const isDirStyle = lsEntryIsDirStyle(entry);
  const perms = isDirStyle ? PERMS_DIR : PERMS_FILE;
  const nlink = lsEntryNlink(entry);
  const size = lsEntrySize(entry);
  const date = lsEntryDate();
  return (
    <>
      <span className={`${baseClass} w-[10ch] tabular-nums`}>{perms}</span>
      <span className={`${baseClass} w-4 tabular-nums`}>{nlink}</span>
      <span className={`${baseClass} w-[7ch]`}>{FAKE_USER}</span>
      {!hideGroup && <span className={`${baseClass} w-[7ch]`}>{FAKE_GROUP}</span>}
      <span className={`${baseClass} w-10 tabular-nums text-right`}>{size}</span>
      <span className={`${baseClass} w-24 tabular-nums`}>{date}</span>
    </>
  );
}

export function TerminalLsRow({
  entry,
  nameColor = "primary",
  hideGroup = false,
}: {
  entry: LsEntry;
  /** For dir-style entries: "primary" (default) or "foreground" (white, e.g. projects section). */
  nameColor?: "primary" | "foreground";
  /** ls -o style: omit group column. */
  hideGroup?: boolean;
}) {
  const nameClass = lsEntryIsDirStyle(entry)
    ? nameColor === "foreground"
      ? "text-foreground font-medium"
      : "text-primary font-medium"
    : "text-foreground";
  const displayName = lsEntryDisplayName(entry);
  const metaClass = `${META_BASE} group-hover:text-neutral-400 group-hover:font-semibold`;

  if (entry.type === "file") {
    return (
      <a
        href={entry.href}
        className={`group ${ROW_CLASS} cursor-pointer rounded-md px-1.5 lg:px-2 -mx-1.5 lg:-mx-2 border border-transparent transition-none hover:bg-white/20 hover:border-white/15 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-transparent`}
      >
        <LsRowMetaCells entry={entry} baseClass={metaClass} hideGroup={hideGroup} />
        <span className={`shrink-0 min-w-0 ${nameClass} group-hover:text-foreground group-hover:font-bold`}>
          {displayName}
        </span>
      </a>
    );
  }

  return (
    <div className={`${ROW_CLASS} px-1.5 lg:px-2`}>
      <LsRowMetaCells entry={entry} baseClass={META_BASE} hideGroup={hideGroup} />
      <span className={`shrink-0 min-w-0 ${nameClass}`}>{displayName}</span>
    </div>
  );
}
