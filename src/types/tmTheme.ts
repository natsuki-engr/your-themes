export const tmThemeColorNames = ["background", "caret", "foreground", "invisibles", "lineHighlight", "selection"];

export interface TmTheme {
  name: string;
  settings: Array<{
    settings: { [colorNames: (typeof tmThemeColorNames)[number]]: string };
  }>;
}

export const isTmTheme = (content: unknown): content is TmTheme => {
  if (typeof content !== "object" || content === null || !("settings" in content)) {
    return false;
  }

  if (!Array.isArray(content.settings) || !("settings" in content.settings[0])) {
    return false;
  }

  const settings = content.settings[0].settings;
  if (
    typeof settings !== "object" ||
    settings === null ||
    !Object.values(settings).every((v) => typeof v === "string")
  ) {
    return false;
  }

  return true;
};
