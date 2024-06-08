import * as vscode from "vscode";

let channel: vscode.OutputChannel | null = null;

export default class Logger {
  static log(msg: string) {
    const date = new Date();
    // prettier-ignore
    const timestamp = date.getFullYear() + '-' + pad2(date.getMonth() + 1) + '-' + pad2(date.getDate()) + ' ' + pad2(date.getHours()) + ':' + pad2(date.getMinutes()) + ':' + pad2(date.getSeconds()) + '.' + pad3(date.getMilliseconds());
    if (channel === null) {
      channel = vscode.window.createOutputChannel("Theme View");
    }
    channel.appendLine("[" + timestamp + "] " + msg);
  }
}

function pad2(n: number) {
  return (n > 9 ? "" : "0") + n;
}

function pad3(n: number) {
  return (n > 99 ? "" : n > 9 ? "0" : "00") + n;
}
