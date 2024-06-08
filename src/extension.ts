// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "theme-view" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  // let disposable = vscode.commands.registerCommand('theme-view.helloWorld', () => {
  // 	// The code you place here will be executed every time your command is executed
  // 	// Display a message box to the user
  // 	vscode.window.showInformationMessage('Hello World from theme-view!');
  // });
  let disposable = vscode.commands.registerCommand(
    "theme-view.viewThemes",
    (editBuilder, _editor, _selection, dex) => {
      const panel = vscode.window.createWebviewPanel(
        "viewThemes",
        "view your local themes",
        {
          viewColumn: vscode.ViewColumn.Active,
        },
        {
          enableScripts: true,
        }
      );
      const scriptPath = panel.webview.asWebviewUri(
        vscode.Uri.joinPath(
          context.extensionUri,
          "./webview/dist/",
          "index.js"
        )
      );
      const cssStyle = panel.webview.asWebviewUri(
        vscode.Uri.joinPath(
          context.extensionUri,
          "./webview/dist/assets/",
          "index.css"
        )
      );

      panel.webview.html = `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link rel="stylesheet" crossorigin type="text/css" href="${cssStyle}" />
				<script type="module" crossorigin src="${scriptPath}"></script>
			</head>
			<body>
				<div id="root"></div>
			</body>
			</html>`;
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
