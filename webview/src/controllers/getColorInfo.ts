import { ThemeInfo } from "../../../src/types/themeInfo";
import postMessage from "./postMessage";
import MessageListener from "./messageListener";
import { SvgColors, isSvgColors } from "../../../src/types/svgColors";

export const getColorInfo = async (messageListener: MessageListener, themeDir: string, themePathListByLabel: Record<ThemeInfo['label'], ThemeInfo['path']>): Promise<Record<string, SvgColors>> => {
  return new Promise<Record<string, SvgColors>>(resolve => {
    messageListener.receive("resp-of-get-group-color-themes", (json) => {
      isResponse(json) ? console.log('themeDir === json.groupDir', themeDir === json.groupDir) : '';
      if(isResponse(json) && themeDir === json.groupDir) {
        resolve(json.themes)
        return true
      } else {
        return false
      }
    })

    postMessage.send("get-group-color-themes", { themeDir, themePathListByLabel });
  })

}

interface Response {
  themes: Record<string, SvgColors>
  groupDir: string
}

const isResponse = (data: unknown): data is Response => {
  return (
    typeof data === "object" &&
    data !== null &&
    "themes" in data &&
    typeof data.themes === 'object' &&
    data.themes !== null &&
    Object.values(data.themes).every(isSvgColors) &&
    "groupDir" in data &&
    typeof data.groupDir === "string"
  );
}
