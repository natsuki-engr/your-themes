import { useEffect, useState } from "react";
import "./App.css";
import {
  type ThemeGroupInfo,
  isThemeGroupInfo,
} from "../../src/types/themeInfo";
import "vscode-webview";
import ThemeList from "./components/ThemeList";
import { getThemeList } from "./controllers/getThemeList";

document.addEventListener('keyup', (e: KeyboardEvent) => {
  e.stopPropagation()
  if(e.ctrlKey && e.key === 'r') {
    location.reload()
  }
})

function App() {
  const [themeLists, setThemeList] = useState<ThemeGroupInfo[]>();

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const msgData = e.data;
      const command = "command" in msgData ? msgData.command : "";
      let json: unknown;
      console.log('msgData', msgData)
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
    getThemeList()

    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return (
    <div className="bg-vscode-editor-background w-full p-8">
      {themeLists ? (
        <ThemeList themeGroups={themeLists}></ThemeList>
      ) : (
        <span>hey!</span>
      )}
    </div>
  );
}

export default App;
