import postMessage from "./postMessage.ts";

export const getThemeList = () => {
  postMessage.send("get-theme-list");
};
