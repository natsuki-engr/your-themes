// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { createNewPanel } from "./panel";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let panel: vscode.WebviewPanel | undefined;

  let disposable = vscode.commands.registerCommand(
    "your-themes.openViewer",
    async (_editBuilder, _editor, _selection, _dex) => {
      if (panel === undefined) {
        panel = createNewPanel(context);
        panel.onDidDispose(() => {
          panel = undefined;
        });
      } else {
        panel.reveal(panel.viewColumn);
      }
    },
  );

  context.subscriptions.push(disposable);
  console.log('Congratulations, your extension "your-themes" is now active!');
}

// This method is called when your extension is deactivated
export function deactivate() {}
