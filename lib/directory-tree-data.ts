import { projects, skillsByCategory } from "@/lib/portfolio-data";
import type { TreeNode } from "@/components/directory-tree";

const nextjsIconUrl = skillsByCategory.frontend.find((s) => s.name === "Next.js")?.icon;

/**
 * Pages tree for the root page: pages folder with me.
 */
export function getPagesTreeNodes(): TreeNode[] {
  return [
    {
      id: "pages",
      name: "pages",
      type: "folder",
      children: [
        {
          id: "me",
          name: "me",
          type: "app",
          href: "/me",
          icon: "globe",
        },
      ],
    },
  ];
}

/**
 * Projects tree for the root page: projects folder with booknooq & crosswit.
 * Uses same URLs as /me project cards; app entries use Next.js icon.
 */
export function getProjectsTreeNodes(): TreeNode[] {
  const booknooqProject = projects.find((p) => p.name === "booknooq");
  const crosswitProject = projects.find((p) => p.name === "Crosswit");

  const projectApps: TreeNode[] = [];
  if (crosswitProject?.url) {
    projectApps.push({
      id: "crosswit",
      name: "crosswit",
      type: "app",
      href: crosswitProject.url,
      icon: nextjsIconUrl,
    });
  }
  if (booknooqProject?.url) {
    projectApps.push({
      id: "booknooq",
      name: "booknooq",
      type: "app",
      href: booknooqProject.url,
      icon: nextjsIconUrl,
    });
  }

  if (projectApps.length === 0) return [];

  return [
    {
      id: "projects",
      name: "projects",
      type: "folder",
      children: projectApps,
    },
  ];
}

/** Folder IDs to expand on first render for the pages tree. */
export const defaultExpandedPagesIds = ["pages"];

/** Folder IDs to expand on first render for the projects tree. */
export const defaultExpandedProjectsIds = ["projects"];
