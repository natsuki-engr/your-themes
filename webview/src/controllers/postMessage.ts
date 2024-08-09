class PostMessage {
  #vscode: ReturnType<typeof acquireVsCodeApi>;

  constructor() {
    this.#vscode = acquireVsCodeApi();
  }

  send(command: string, params?: object) {
    this.#vscode.postMessage({ command, ...params });
  }
}

export default new PostMessage();
