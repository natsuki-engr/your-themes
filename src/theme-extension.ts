import * as fs from "fs";
import * as vscode from "vscode";
import {
  ColorThemeSetting,
  isColorThemeSetting,
} from "./types/colorThemeSetting";
import { isThemeInfo, type ThemeGroupInfo } from "./types/themeInfo";

export const getThemeExtensionList = (): vscode.Extension<any>[] => {
  const extensions = vscode.extensions.all;
  const themes = extensions.filter((ext) => {
    if ("categories" in ext.packageJSON) {
      const categories = ext.packageJSON.categories;
      return Array.isArray(categories) && categories.indexOf("Themes") !== -1;
    } else {
      return false;
    }
  });

  return themes;
};

export const getThemeInfoList = (): ThemeGroupInfo[] => {
  const themeGroupInfo: ThemeGroupInfo[] = [];
  const themeGroups = getThemeExtensionList();
  for (const theme of themeGroups) {
    let packageJson;
    if (!hasThemesList((packageJson = theme.packageJSON))) {
      continue;
    }

    const marketPlaceUrl = `https://marketplace.visualstudio.com/items?itemName=${theme.id}`;
    const isBuiltin = isBuiltinTheme(theme.packageJSON);

    themeGroupInfo.push({
      id: theme.id,
      displayName: displayName(theme.packageJSON) ?? theme.id,
      marketplaceUrl: marketPlaceUrl,
      isBuiltin: isBuiltin,
      themeDir: theme.extensionPath,
      themes: packageJson.contributes.themes.filter((themes: any) =>
        isThemeInfo(themes),
      ),
    });
  }

  return themeGroupInfo;
};

export const getColorSetting = async (
  filePath: string,
): Promise<ColorThemeSetting | null> => {
  const file = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(file);
  if (isColorThemeSetting(json)) {
    return json;
  } else {
    return null;
  }
};

const hasThemesList = (
  packageJson: any,
): packageJson is { contributes: { themes: any } } => {
  return (
    "contributes" in packageJson &&
    "themes" in packageJson.contributes &&
    Array.isArray(packageJson.contributes.themes)
  );
};

const isBuiltinTheme = (themePackageJson: unknown): boolean => {
  return (
    typeof themePackageJson === "object" &&
    themePackageJson !== null &&
    "isBuiltin" in themePackageJson &&
    themePackageJson.isBuiltin === true
  );
};

const displayName = (themePackageJson: ThemeGroupInfo): string | null => {
  return typeof themePackageJson === "object" &&
    themePackageJson !== null &&
    "displayName" in themePackageJson
    ? themePackageJson.displayName
    : null;
};
