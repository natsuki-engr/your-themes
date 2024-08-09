import { useEffect, useState } from "react";
import "vscode-webview";
import {
  isThemeGroupInfo,
  type ThemeGroupInfo,
} from "../../src/types/themeInfo";
import "./App.css";
import TargetTabs from "./components/TargetTabs";
import ThemeList from "./components/ThemeList";
import { getThemeList } from "./controllers/getThemeList";

document.addEventListener("keyup", (e: KeyboardEvent) => {
  e.stopPropagation();
  if (e.ctrlKey && e.key === "r") {
    location.reload();
  }
});

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
    getThemeList();

    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return (
    <>
      <TargetTabs />
      <div className="bg-vscode-editor-background min-h-screen w-full p-8">
        {themeLists ? <ThemeList themeGroups={themeLists}></ThemeList> : <></>}
      </div>
    </>
  );
}

export default App;
