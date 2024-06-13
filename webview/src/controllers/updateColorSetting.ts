import postMessage from "./postMessage.ts";

export const updateColorSetting = (label: string, target: string) => {
  postMessage.send("update-color", { label, target });
};
