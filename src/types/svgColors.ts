export const ColorOptions = [
  "tab.activeBackground",
  "tab.activeForeground",
  "tab.inactiveBackground",
  "tab.inactiveForeground",
  "contrastActiveBorder",
  "sideBar.background",
  "editor.background",
  "activityBar.background",
  "activityBar.foreground",
  "activityBarBadge.background",
  "activityBarBadge.foreground",
  "contrastBorder",
  "statusBar.background",
  "statusBar.foreground",
  "titleBar.activeBackground",
  "titleBar.border",
] as const;

export interface SvgColors extends Record<(typeof ColorOptions)[number], string> {
  "tab.activeBackground": string; // "#00F"
  "tab.activeForeground": string; // "#FF0", // active tab text color
  "tab.inactiveBackground": string; // "#000", // inactive tab background color
  "tab.inactiveForeground": string; // "#FFF", // inactive tab text color
  contrastActiveBorder: string; // "#FF0", // border color for the active item (e.g. file in explorer, tab and icon in activity bar)
  "sideBar.background": string; // "#000", // background color for the side bar
  "editor.background": string; // "#000",
  "activityBar.background": string; // "#000", // background color for the activity bar
  "activityBar.foreground": string; // "#FF0", // text color for the activity bar
  "activityBarBadge.background": string; // "#000", // background color for the badge in activity bar
  "activityBarBadge.foreground": string; // "#FFF", // text color for the badge in activity bar
  contrastBorder: string; // "#0FF", // border color of dividing activity badge, bar, side bar, editor and etc
  "statusBar.background": string; // "#000", // background color of status bar
  "statusBar.foreground": string; // "#FFF", // text color of status bar
  "titleBar.activeBackground": string; // "#000",
  "titleBar.border": string; // "#ff0000"
}

export const isSvgColors = (data: unknown): data is SvgColors => {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  for (const key in data) {
    let value: any;
    if (
      ColorOptions.includes(key as (typeof ColorOptions)[number]) &&
      (typeof (value = (data as Record<string, unknown>)[key]) === "string" || value === null)
    ) {
      continue;
    } else {
      return false;
    }
  }

  return true;
};

export const isPartialSvgColors = (data: unknown): data is Partial<SvgColors> => {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  for (const key in ColorOptions) {
    if (key in data && typeof (data as Record<string, unknown>)[key] === "string") {
      continue;
    } else {
      return false;
    }
  }

  return true;
};
