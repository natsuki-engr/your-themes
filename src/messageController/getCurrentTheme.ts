import * as vscode from "vscode";
import { ConfigTarget, ConfigTargetValueType } from "../types/ConfigTarget";

export const getCurrentTheme = (target: ConfigTargetValueType) => {
  const config = vscode.workspace.getConfiguration("workbench");
  const colorTheme = config.inspect<string>("colorTheme");

  let label: string = "";
  switch (target) {
    case ConfigTarget.User:
      label = colorTheme?.globalValue ?? "";
      break;
    case ConfigTarget.Workspace:
      label = colorTheme?.workspaceValue ?? "";
      break;
  }

  return label;
};
