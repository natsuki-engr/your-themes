export interface ThemeGroupInfo {
  id: string;
  displayName: string;
  marketplaceUrl: string;
  isBuiltin: boolean;
  themeDir: string;
  themes: ThemeInfo[];
}

export interface ThemeInfo {
  id?: string;
  label: string;
  uiTheme: string;
  path: string;
}

export const isThemeGroupInfo = (data: any): data is ThemeGroupInfo => {
  return (
    "id" in data &&
    typeof data.id === "string" &&
    "themeDir" in data &&
    typeof data.themeDir === "string" &&
    "themes" in data &&
    Array.isArray(data.themes) &&
    data.themes.every(isThemeInfo)
  );
};

export const isThemeInfo = (data: any): data is ThemeInfo => {
  return (
    ("id" in data ? typeof data.id === "string" : true) &&
    "label" in data &&
    "uiTheme" in data &&
    "path" in data &&
    typeof data.label === "string" &&
    typeof data.uiTheme === "string" &&
    typeof data.path === "string"
  );
};
