import * as vscode from "vscode";

export const getCurrentTheme = () => {
  const userConfig = vscode.workspace.getConfiguration("");
  return userConfig.get("workbench.colorTheme");
};
