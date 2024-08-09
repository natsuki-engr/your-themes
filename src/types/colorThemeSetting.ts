export interface ColorThemeSetting {
  colors: any;
  // colors: {
  // 	"editor.background": string
  // 	"statusBar.background": string
  // }
}

export const isColorThemeSetting = (data: any): data is ColorThemeSetting => {
  return "colors" in data && typeof data.colors === "object";
};

export const ColorScheme = {
  DARK: "dark",
  LIGHT: "light",
  HIGH_CONTRAST_DARK: "hcDark",
  HIGH_CONTRAST_LIGHT: "hcLight",
} as const;

export type ColorSchemeType = (typeof ColorScheme)[keyof typeof ColorScheme];
