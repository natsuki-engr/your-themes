import MessageListener from "./messageListener";
import postMessage from "./postMessage";

export const getConfigTargets = (messageListener: MessageListener) => {
  return new Promise<Array<{ name: string; index: number }>>((resolve) => {
    messageListener.receive("resp-of-get-config-targets", (json) => {
      if (isResponse(json)) {
        resolve(json.targets);
        return true;
      } else {
        return false;
      }
    });
    postMessage.send("get-config-targets");
  });
};

interface Response {
  targets: Array<{ name: string; index: number }>;
}

const isResponse = (data: unknown): data is Response => {
  return (
    typeof data === "object" &&
    data !== null &&
    "targets" in data &&
    Array.isArray(data.targets) &&
    data.targets.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "name" in item &&
        typeof item.name === "string" &&
        "index" in item &&
        typeof item.index === "number"
    )
  );
};
