import { SvgColors, TokenColorOptions } from "../types/svgColors";
import { ThemeConfig } from "../types/themeConfig";

export const setTokenColors = (tokenColorSettings: ThemeConfig["tokenColors"]): SvgColors["tokenColors"] => {
  const tokenColors: SvgColors["tokenColors"] = {};

  for (const { scope: scopes, name, settings } of tokenColorSettings) {
    let foreground: string | undefined = settings?.foreground;
    if (foreground === undefined) {
      continue;
    }

    if (Array.isArray(scopes)) {
      for (const scope of scopes) {
        if (TokenColorOptions.includes(scope)) {
          tokenColors[scope] = foreground;
        }
      }
    } else {
      if (TokenColorOptions.includes(scopes)) {
        tokenColors[scopes] = foreground;
      }
    }
  }

  return tokenColors;
};
