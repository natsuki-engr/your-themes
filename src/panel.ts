import * as vscode from "vscode";
import { getThemeInfoList } from "./theme-extension";
import Logger from "./logger";
import { updateColorTheme } from "./messageController/updateColorTheme";
import { getGroupColorThemes } from "./messageController/getGroupColorThemes";
import { ThemeInfo } from "./types/themeInfo";
import { getCurrentTheme } from "./messageController/getCurrentTheme";
import { ConfigTargetValueType } from "./types/ConfigTarget";
import { getConfigTargets } from "./messageController/getConfigTargets";

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

const registerCommands = async (panel: vscode.WebviewPanel) => {
  panel.webview.onDidReceiveMessage(async (msg: Message) => {
    Logger.log("msg" + JSON.stringify(msg));
    try {
      switch (msg.command) {
        case "get-theme-list":
          const themes = getThemeInfoList();
          response({
            panel,
            command: "resp-of-get-theme-list",
            json: themes,
          });
          return;
        case "update-color":
          await updateColorTheme(msg.label, msg.target);
          response({
            panel,
            command: "resp-of-update-color",
            json: {},
          });
          return;
        case "get-group-color-themes":
          const themesByLabel = await getGroupColorThemes(msg.themeDir, msg.themePathListByLabel);
          response({
            panel,
            command: "resp-of-get-group-color-themes",
            json: { themes: themesByLabel, groupDir: msg.themeDir },
          });
          return;
        case "get-current-theme-label":
          const currentTheme = getCurrentTheme(msg.target);
          response({
            panel,
            command: "resp-of-get-current-theme-label",
            json: { themeLabel: currentTheme },
          });
          return;
        case "get-config-targets":
          const targets = getConfigTargets();
          response({
            panel,
            command: "resp-of-get-config-targets",
            json: { targets },
          });
      }
    } catch (error) {
      if(error instanceof Error) {
        Logger.log("error" + JSON.stringify(error));
      }
    }
  });
};

const response = ({panel, command, json}: {panel: vscode.WebviewPanel, command: string, json: any}) => {
  panel.webview.postMessage({
    command,
    json,
  });
};

type Message =
  | {
    command: "get-theme-list";
  }
  | {
    command: "update-color";
    label: string;
    target: ConfigTargetValueType;
  }
  | {
      command: "get-group-color-themes";
      themeDir: string;
      themePathListByLabel: {
        [label: ThemeInfo["label"]]: {
          path: ThemeInfo["path"],
          uiTheme: ThemeInfo["uiTheme"],
        }
      };
    }
  | {
      command: "get-current-theme-label";
      target: ConfigTargetValueType
  } | {
    command: "get-config-targets";
  };
