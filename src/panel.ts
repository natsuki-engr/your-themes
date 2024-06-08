import * as vscode from "vscode";
import { getThemeInfoList } from "./theme-extension";
import Logger from "./logger";
import { updateColorTheme } from "./messageController/updateColorTheme";

export const createNewPanel = (
  context: vscode.ExtensionContext
): vscode.WebviewPanel => {
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
    vscode.Uri.joinPath(context.extensionUri, "./webview/dist/", "index.js")
  );
  const cssStyle = panel.webview.asWebviewUri(
    vscode.Uri.joinPath(
      context.extensionUri,
      "./webview/dist/assets/",
      "index.css"
    )
  );

  registerCommands(panel);

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

  return panel;
};

const registerCommands = (panel: vscode.WebviewPanel) => {
  panel.webview.onDidReceiveMessage((msg: Message) => {
    Logger.log("msg" + JSON.stringify(msg));
    switch (msg.command) {
      case "get-theme-list":
        const themes = getThemeInfoList();
        panel.webview.postMessage({
          command: "resp-of-get-theme-list",
          json: themes,
        });
        return themes;
      case "update-color":
        updateColorTheme(msg.label, msg.target);
    }
  });
};

type Message =
  | {
      command: "get-theme-list";
    }
  | {
      command: "update-color";
      label: string;
      target: string;
    };
