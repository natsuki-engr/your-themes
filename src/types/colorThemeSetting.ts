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
