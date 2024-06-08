import postMessage from "./postMessage";

export const updateColorSetting = (label: string, target: string) => {
  postMessage.send("update-color", { label, target });
};
