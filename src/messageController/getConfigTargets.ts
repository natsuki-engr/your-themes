import { workspace } from "vscode";

export const getConfigTargets = (): Array<{ name: string; index: number }> => {
  return (
    workspace.workspaceFolders?.map((w) => ({
      name: w.name,
      index: w.index,
    })) ?? []
  );
};
