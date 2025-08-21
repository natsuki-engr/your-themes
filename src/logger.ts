import * as vscode from "vscode";

let channel: vscode.OutputChannel | null = null;

export default class Logger {
  static log(...msgArgs: (string | boolean | number | object)[]) {
    const date = new Date();
    // prettier-ignore
    const timestamp = date.getFullYear() + '-' + pad2(date.getMonth() + 1) + '-' + pad2(date.getDate()) + ' ' + pad2(date.getHours()) + ':' + pad2(date.getMinutes()) + ':' + pad2(date.getSeconds()) + '.' + pad3(date.getMilliseconds());
    if (channel === null) {
      channel = vscode.window.createOutputChannel("Your Themes");
    }

    let msg = msgArgs
      .map((m) => {
        if (
          typeof m === "string" ||
          typeof m === "boolean" ||
          typeof m === "number"
        ) {
          return m;
        } else {
          return JSON.stringify(m);
        }
      })
      .join(" ");

    channel.appendLine("[" + timestamp + "] " + msg);
  }
}

function pad2(n: number) {
  return (n > 9 ? "" : "0") + n;
}

function pad3(n: number) {
  return (n > 99 ? "" : n > 9 ? "0" : "00") + n;
}
