import MessageListener from "./messageListener";
import postMessage from "./postMessage";

export const getCurrentThemeLabel = async (command: string, messageListener: MessageListener) => {
  return new Promise<string>((resolve) => {
    messageListener.receive("resp-of-" + command, (json) => {
      if (isResponse(json)) {
        resolve(json.themeLabel);
        return true;
      } else {
        return false;
      }
    });

    postMessage.send(command);
  });
};

interface Response {
  themeLabel: string;
}

const isResponse = (data: unknown): data is Response => {
  return typeof data === "object" && data !== null && "themeLabel" in data && typeof data.themeLabel === "string";
};
