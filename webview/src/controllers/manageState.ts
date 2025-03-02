import { vscode } from "../vscodeInstance";

type Serializable =
  | string
  | number
  | boolean
  | null
  | Serializable[]
  | { [key: string]: Serializable };

class ManageState {
  #vscode: ReturnType<typeof acquireVsCodeApi>;

  constructor() {
    this.#vscode = vscode;
  }

  getState(key?: string): Serializable | undefined {
    const state = this.#vscode.getState();
    if (key === undefined) return state as Serializable;

    if (state && typeof state === "object" && !Array.isArray(state)) {
      return (state as Record<string, Serializable>)[key];
    }

    return undefined;
  }

  setState(key: string, value: Serializable): void {
    const state = this.#vscode.getState();
    let currentState: Record<string, Serializable>;
    if (state && typeof state === "object" && !Array.isArray(state)) {
      currentState = state as Record<string, Serializable>;
    } else {
      currentState = {};
    }

    this.#vscode.setState({
      ...currentState,
      [key]: value,
    });
  }
}

export default new ManageState();
