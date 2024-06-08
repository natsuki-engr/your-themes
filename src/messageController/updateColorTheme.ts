import { workspace, ConfigurationTarget } from "vscode";

export const updateColorTheme = (label: string, target: string) => {
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
      configTarget = ConfigurationTarget.Workspace;
      break;
    default:
      configTarget = null;
  }

  if (configTarget === null) {
    throw new Error();
  }

  workspace
    .getConfiguration()
    .update("workbench.colorTheme", label, configTarget);
};
