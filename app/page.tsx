import {
  getPagesTreeNodes,
  getProjectsTreeNodes,
} from "@/lib/directory-tree-data";
import { treeNodesToLsSections } from "@/lib/terminal-ls-data";
import { TerminalView } from "./terminal-view";

export default function Home() {
  const pagesNodes = getPagesTreeNodes();
  const projectsNodes = getProjectsTreeNodes();
  const sections = treeNodesToLsSections(pagesNodes, projectsNodes);

  return (
    <div className="grid min-h-dvh grid-rows-[1fr] bg-background text-foreground min-[480px]:flex min-[480px]:flex-col min-[480px]:justify-center min-[480px]:items-center">
      <div
        className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_bottom,rgba(184,168,138,0.06)_0%,transparent_40%,transparent_60%,rgba(184,168,138,0.04)_100%)]"
        aria-hidden
      />
      <div className="relative min-h-0 w-full max-w-[900px] max-h-dvh overflow-y-auto px-3 sm:px-0 min-[480px]:-mt-24 min-[480px]:flex min-[480px]:justify-center min-[480px]:gap-y-6">
        <TerminalView sections={sections} />
      </div>
    </div>
  );
}
