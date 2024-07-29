export interface ThemeConfig {
  colors: Record<string, string | null>;
  type?: string;
  tokenColors: Array<{
    scope: string | string[];
    name: string;
    settings?: {
      foreground?: string;
    };
  }>;
}

export const isThemeConfig = (content: unknown): content is ThemeConfig => {
  if (typeof content !== "object" || content === null || !("colors" in content) || !("tokenColors" in content)) {
    return false;
  }

  if (typeof content.colors !== "object" || content.colors === null) {
    return false;
  }

  if (typeof content.tokenColors !== "object" || content.tokenColors === null) {
    return false;
  }

  return Object.values(content.colors).every((v) => typeof v === "string" || v === null);
};
