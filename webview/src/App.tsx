import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  type ThemeGroupInfo,
  isThemeGroupInfo,
} from "../../src/types/themeInfo";
import "vscode-webview";
import ThemeList from "./components/ThemeList";

const vscode = acquireVsCodeApi();

function App() {
  const [themeLists, setThemeList] = useState<ThemeGroupInfo[]>();

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const msgData = e.data;
      const command = "command" in msgData ? msgData.command : "";
      let json: unknown;
      switch (command) {
        case "resp-of-get-theme-list":
          json = "json" in msgData ? msgData.json : [];
          if (Array.isArray(json) && json.every(isThemeGroupInfo)) {
            setThemeList(json);
          }
          break;
      }
    };

    window.addEventListener("message", onMessage);
    vscode.postMessage({ command: "get-theme-list" });

    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {themeLists ? (
        <ThemeList themeGroups={themeLists}></ThemeList>
      ) : (
        <span>hey!</span>
      )}
    </>
  );
}

export default App;
