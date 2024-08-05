import fs from "fs";
import JSON5 from "json5";
import plist from "plist";
import path from "path";
import Logger from "../logger";
import { ThemeInfo } from "../types/themeInfo";
import { ColorOptions, SvgColors } from "../types/svgColors";
import { defaultColors } from "../defaults";
import { isTmTheme, TmTheme } from "../types/tmTheme";
import { isThemeConfig, ThemeConfig } from "../types/themeConfig";
import { parseTmTheme } from "../services/tmThemeService";
import { ColorScheme, ColorSchemeType } from "../types/colorThemeSetting";
import { setTokenColors } from "../services/setTokenColors";

export const getGroupColorThemes = async (
  themeDir: string,
  themePathListByLabel: {
    [label: ThemeInfo["label"]]: {
      path: ThemeInfo["path"];
      uiTheme: ThemeInfo["uiTheme"];
    };
  }
): Promise<Record<ThemeInfo["label"], SvgColors>> => {
  const colorThemesByLabel: Record<ThemeInfo["label"], SvgColors> = {};
  for (const themeLabel of Object.keys(themePathListByLabel)) {
    try {
      const themePath = path.join(themeDir, themePathListByLabel[themeLabel]?.path ?? "");
      const setting = await getThemeSettingObj(themePath);
      if (setting === null) {
        continue;
      }

      const themeColors: SvgColors = {
        colors: {},
        tokenColors: {},
      } as SvgColors;

      themeColors.tokenColors = {};

      const themeType: ColorSchemeType = getThemeType(themePathListByLabel[themeLabel]?.uiTheme ?? "");

      if (setting.colors === undefined) {
        setting.colors = {};
      }

      const colors = setting.colors;
      const tokenColors = setting.tokenColors;
      const setColor = (colorKey: keyof SvgColors["colors"]) => {
        const colorCode = colors[colorKey] ?? defaultColors[colorKey][themeType];
        if (typeof colorCode === "string") {
          themeColors.colors[colorKey] = colorCode;
        }
      };

      ColorOptions.forEach((key) => setColor(key));
      themeColors.tokenColors = setTokenColors(tokenColors);

      overrideUndefinedColors(themeColors);

      colorThemesByLabel[themeLabel] = themeColors;
    } catch (error) {
      if (error instanceof Error) {
        Logger.log(`can't read theme file [${themeDir}]: ${error.message}\n${error.stack}`);
      }
    }
  }
  return colorThemesByLabel;
};

const getThemeSettingObj = async (themeFilePath: string): Promise<ThemeConfig | null> => {
  const ext = path.extname(themeFilePath);
  const file = await fs.readFileSync(themeFilePath, { encoding: "utf-8" });

  let content = null;
  switch (ext.toLowerCase()) {
    case ".json":
      content = JSON5.parse(file) as unknown;
      if (!isThemeConfig(content)) {
        content = null;
      }
      break;
    case ".tmtheme":
      content = plist.parse(file) as unknown;
      if (!isTmTheme(content)) {
        content = null;
      } else {
        content = parseTmTheme(content);
      }
      break;
  }
  return content;
};

const getThemeType = (uiTheme: string): ColorSchemeType => {
  switch (uiTheme) {
    case "vs-dark":
      return ColorScheme.DARK;
    case "hc-black":
      return ColorScheme.HIGH_CONTRAST_DARK;
    case "hc-light":
      return ColorScheme.HIGH_CONTRAST_LIGHT;
    default:
      return "light";
  }
};

const overrideUndefinedColors = (themeColors: SvgColors): void => {
  const colors: Array<[(typeof ColorOptions)[number], (typeof ColorOptions)[number]]> = [
    ["sideBar.border", "contrastBorder"],
    ["activityBar.border", "contrastBorder"],
    ["statusBar.border", "contrastBorder"],
  ];

  for (const [fromKey, toKey] of colors) {
    if (themeColors.colors[fromKey] === undefined && themeColors.colors[toKey] !== undefined) {
      themeColors.colors[fromKey] = themeColors.colors[toKey];
    }
  }
};
