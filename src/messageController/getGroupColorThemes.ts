import fs from "fs";
import JSON5 from "json5";
import path from "path";
import Logger from "../logger";
import { ThemeInfo } from "../types/themeInfo";
import { ColorOptions, SvgColors } from "../types/svgColors";

export const getGroupColorThemes = async (
  themeDir: string,
  themePathListByLabel: Record<ThemeInfo["label"], ThemeInfo["path"]>
): Promise<Record<ThemeInfo["label"], SvgColors>> => {
  const colorThemesByLabel: Record<ThemeInfo["label"], SvgColors> = {};
  for (const themeLabel of Object.keys(themePathListByLabel)) {
    try {
      const themePath = path.join(themeDir, themePathListByLabel[themeLabel] ?? "");
      const file = await fs.readFileSync(themePath, { encoding: "utf-8" });

      const setting = JSON5.parse(file) as unknown;

      const themeColors: SvgColors = {} as SvgColors;
      if (typeof setting !== "object" || setting === null || !("colors" in setting)) {
        continue;
      }

      const colors = setting.colors as Record<string, unknown>;
      if (colors === null || typeof colors !== "object" || Array.isArray(colors)) {
        continue;
      }

      const setColor = (colorKey: keyof SvgColors) => {
        if (colorKey in colors) {
          const colorCode = colors[colorKey];
          if (typeof colorCode === "string") {
            themeColors[colorKey] = colorCode;
          }
        }
      };

      ColorOptions.forEach((key) => setColor(key));

      colorThemesByLabel[themeLabel] = themeColors;
    } catch (error) {
      if (error instanceof Error) {
        Logger.log(`can't read theme file [${themeDir}]: ` + error.message);
      }
    }
  }
  return colorThemesByLabel;
};
