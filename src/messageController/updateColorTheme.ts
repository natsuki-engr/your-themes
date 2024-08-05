import { workspace, ConfigurationTarget } from "vscode";
import { ConfigTargetValueType } from "../types/ConfigTarget";

export const updateColorTheme = async (label: string, target: ConfigTargetValueType) => {
  let configTarget: ConfigurationTarget.Global | ConfigurationTarget.Workspace | null;

  switch (target) {
    case "user":
      configTarget = ConfigurationTarget.Global;
      break;
    case "workspace":
      configTarget = ConfigurationTarget.Workspace;
      break;
    default:
      configTarget = null;
  }

  if (configTarget === null) {
    throw new Error();
  }

  await workspace.getConfiguration().update("workbench.colorTheme", label, configTarget);
};
