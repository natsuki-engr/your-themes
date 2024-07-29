import { workspace, ConfigurationTarget } from "vscode";
import { getCurrentTheme } from "./getCurrentTheme";

export const updateColorTheme = async (label: string, target: string) => {
  let configTarget:
    | (typeof ConfigurationTarget)[keyof typeof ConfigurationTarget]
    | null;
  switch (target) {
    case "user":
      configTarget = ConfigurationTarget.Global;
      break;
    case "workspace":
      configTarget = ConfigurationTarget.Workspace;
      break;
    case "folder":
      configTarget = ConfigurationTarget.WorkspaceFolder;
      break;
    default:
      configTarget = null;
  }

  if (configTarget === null) {
    throw new Error();
  }

  await workspace
    .getConfiguration()
    .update("workbench.colorTheme", label, configTarget);
};
