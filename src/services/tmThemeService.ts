import { ColorOptions } from "../types/svgColors";
import { ThemeConfig } from "../types/themeConfig";
import { TmTheme } from "../types/tmTheme";

export const parseTmTheme = (content: TmTheme): ThemeConfig | null => {
  const mapping: Record<string, (typeof ColorOptions)[number]> = {
    background: "editor.background",
    // "caret": "editorCursor.foreground",
    // "selection": "editor.selectionBackground",
    // "lineHighlight": "editor.lineHighlightBackground",
    // "foreground": "editor.foreground",
    // "invisibles": "editorWhitespace.foreground",
  };

  const config: ThemeConfig = {
    colors: {},
    type: "dark",
    tokenColors: [],
  };

  const settings = content.settings[0]?.settings ?? {};
  for (const [fromKey, color] of Object.entries(mapping)) {
    if (fromKey in settings && mapping[fromKey] !== undefined) {
      const toKey = mapping[fromKey] as typeof mapping[keyof typeof mapping];
      config.colors[toKey] = settings[fromKey] ?? null;
    }
  }

  return config;
};
