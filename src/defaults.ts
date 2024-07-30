import { ColorOptions } from "./types/svgColors";

const white = "#FFF";
const black = "#000";

const contrastBorder = { light: null, dark: null, hcDark: "#6FC3DF", hcLight: "#0F4A85" };
const foreground = { dark: "#CCCCCC", light: "#616161", hcDark: "#FFFFFF", hcLight: "#292929" };
const editorForeground = { light: "#333333", dark: "#BBBBBB", hcDark: white, hcLight: foreground.hcLight };

// Reference
// https://github.com/microsoft/vscode/blob/22e3447b4b410dcf8426bf70743c5dd4030d6122/src/vs/workbench/common/theme.ts

export const defaultColors: Record<
  (typeof ColorOptions)[number],
  {
    dark: string | null;
    light: string | null;
    hcDark: string | null;
    hcLight: string | null;
  }
> = {
  "editor.foreground": {
    light: "#333333",
    dark: "#BBBBBB",
    hcDark: white,
    hcLight: foreground.hcLight,
  },
  "tab.activeBackground": {
    light: "#ffffff",
    dark: "#1E1E1E",
    hcDark: black,
    hcLight: white,
  },
  "tab.activeForeground": {
    dark: white,
    light: "333333",
    hcDark: white,
    hcLight: "#292929",
  },
  "tab.inactiveBackground": {
    dark: "#2D2D2D",
    light: "#ECECEC",
    hcDark: null,
    hcLight: null,
  },
  "tab.inactiveForeground": {
    dark: "rgb(243, 243, 243, .5)",
    light: "rgb(243, 243, 243, .7)",
    hcDark: white,
    hcLight: "#292929",
  },
  contrastActiveBorder: {
    dark: null,
    light: null,
    hcDark: "#F38518",
    hcLight: "#006BBD",
  },
  "sideBar.background": {
    dark: "#252526",
    light: "#F3F3F3",
    hcDark: "#000000",
    hcLight: "#FFFFFF",
  },
  "sideBar.border": {
    dark: null,
    light: null,
    hcDark: contrastBorder.hcDark,
    hcLight: contrastBorder.hcLight,
  },
  "editor.background": {
    light: "#ffffff",
    dark: "#1E1E1E",
    hcDark: black,
    hcLight: white,
  },
  "activityBar.background": {
    dark: "#333333",
    light: "#2C2C2C",
    hcDark: "#000000",
    hcLight: "#FFFFFF",
  },
  "activityBar.foreground": {
    dark: white,
    light: white,
    hcDark: white,
    hcLight: "#FFFFFF",
  },
  "activityBar.border": {
    dark: null,
    light: null,
    hcDark: contrastBorder.hcDark,
    hcLight: contrastBorder.hcLight,
  },
  "activityBarBadge.background": {
    dark: "#007ACC",
    light: "#007ACC",
    hcDark: "#000000",
    hcLight: "#0F4A85",
  },
  "activityBarBadge.foreground": {
    dark: white,
    light: white,
    hcDark: white,
    hcLight: white,
  },
  contrastBorder: {
    dark: contrastBorder.dark,
    light: contrastBorder.light,
    hcDark: contrastBorder.hcDark,
    hcLight: contrastBorder.hcLight,
  },
  "statusBar.background": {
    dark: "#007ACC",
    light: "#007ACC",
    hcDark: null,
    hcLight: null,
  },
  "statusBar.foreground": {
    dark: "#FFFFFF",
    light: "#FFFFFF",
    hcDark: "#FFFFFF",
    hcLight: editorForeground.hcLight,
  },
  "titleBar.activeBackground": {
    dark: "#3C3C3C",
    light: "#DDDDDD",
    hcDark: "#000000",
    hcLight: "#FFFFFF",
  },
  "titleBar.border": {
    dark: null,
    light: null,
    hcDark: contrastBorder.hcDark,
    hcLight: contrastBorder.hcLight,
  },
  "statusBar.border": {
    dark: null,
    light: null,
    hcDark: contrastBorder.hcDark,
    hcLight: contrastBorder.hcLight,
  },
  focusBorder: {
    dark: null,
    light: null,
    hcDark: null,
    hcLight: null,
  },
  "editorGroupHeader.tabsBorder": {
    dark: null,
    light: null,
    hcDark: null,
    hcLight: null,
  },
  "editorGroupHeader.tabsBackground": {
    dark: "#252526",
    light: "#F3F3F3",
    hcDark: null,
    hcLight: null,
  },
  "tab.border": {
    dark: "#252526",
    light: "#F3F3F3",
    hcDark: contrastBorder.hcDark,
    hcLight: contrastBorder.hcLight,
  },
  "editorBracketHighlight.foreground1": {
    dark: "#FFD700",
    light: "#0431FAFF",
    hcDark: "#FFD700",
    hcLight: "#0431FAFF",
  },
  "editorBracketHighlight.foreground2": {
    dark: "#DA70D6",
    light: "#319331FF",
    hcDark: "#DA70D6",
    hcLight: "#319331FF",
  },
  "editorBracketHighlight.foreground3": {
    dark: "#179FFF",
    light: "#7B3814FF",
    hcDark: "#87CEFA",
    hcLight: "#7B3814FF",
  },
};
