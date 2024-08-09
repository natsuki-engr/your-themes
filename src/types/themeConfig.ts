export interface ThemeConfig {
  colors?: Record<string, unknown>;
  type?: string;
  tokenColors?: Array<TokenColor>;
}

export interface TokenColor {
  scope?: string | string[];
  name?: string;
  settings?: {
    foreground?: string;
  };
}

export const isThemeConfig = (content: unknown): content is ThemeConfig => {
  if (typeof content !== "object" || content === null) {
    return false;
  }

  // color is optional
  if (
    "colors" in content &&
    (typeof content.colors !== "object" || content.colors === null)
  ) {
    return false;
  }

  // tokenColors is optional
  if (
    "tokenColors" in content &&
    (!Array.isArray(content.tokenColors) ||
      !content.tokenColors.every(isTokenColor))
  ) {
    return false;
  }

  return true;
};

export const isTokenColor = (data: unknown): data is TokenColor => {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  if (
    "scope" in data &&
    !(
      typeof data.scope === "string" ||
      (Array.isArray(data.scope) &&
        data.scope.every((v) => typeof v === "string"))
    )
  ) {
    return false;
  }

  if ("name" in data && typeof data.name !== "string") {
    return false;
  }

  if (
    "settings" in data &&
    typeof data.settings === "object" &&
    data.settings !== null &&
    "foreground" in data.settings &&
    typeof data.settings.foreground !== "string"
  ) {
    return false;
  }

  return true;
};
