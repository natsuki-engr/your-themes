import MessageListener from "./messageListener.ts";
import postMessage from "./postMessage.ts";

export const updateColorSetting = (messageListener: MessageListener, label: string, target: string) => {
  return new Promise<void>((resolve) => {
    messageListener.receive("resp-of-update-color", () => {
      resolve();
      return true;
    });

    postMessage.send("update-color", { label, target });
  });
};
