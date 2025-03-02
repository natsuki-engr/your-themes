import React, { useEffect, useState } from "react";
import { mutate } from "swr";
import {
  ConfigTarget,
  ConfigTargetValueType,
} from "../../../src/types/ConfigTarget";
import { getConfigTargets } from "../controllers/getConfigTargets";
import MessageListener from "../controllers/messageListener";
import { useStaticSWR } from "../stores/useStaticSWR";

const toTitleCase = (s: string) => {
  const arr = s.split("");
  const head = (arr as string[]).shift() as string;
  return head.toUpperCase() + arr.join("");
};

const TargetTabs: React.FC = () => {
  const { data: target, mutate: setTarget } =
    useStaticSWR<ConfigTargetValueType>("config-target", ConfigTarget.User);
  const [workspaceFolders, setWorkspaceFolders] = useState<
    Array<{ name: string; index: number }>
  >([]);

  useEffect(() => {
    const messageListener = new MessageListener();
    getConfigTargets(messageListener).then((targets) => {
      setWorkspaceFolders(targets);
    });

    return () => {
      messageListener.unsubscribe();
    };
  }, []);

  const changeHandler = (target: ConfigTargetValueType) => {
    setTarget(target);
    mutate((key) => key === "get-current-theme-label", undefined, true);
  };

  const targetList = [
    ConfigTarget.User,
    workspaceFolders.length ? ConfigTarget.Workspace : undefined,
  ]
    .filter((v) => v !== undefined)
    .map((t) => ({
      value: t,
      label: toTitleCase(t),
    }));

  return (
    <ul className="bg-vscode-editor-background sideBarSectionHeader-border sticky top-0 z-10 flex h-12 w-full items-end pe-2 ps-2 pt-2">
      {targetList.map((t) => (
        <li className="block">
          <label className="block cursor-pointer border-2 border-solid border-transparent p-3 has-[:checked]:border-b-[var(--vscode-activityBar-activeBorder)]">
            {t.label}
            <input
              onChange={() => changeHandler(t.value)}
              className="pointer-events-none absolute opacity-0"
              type="radio"
              value={t.value}
              checked={target === t.value}
              name="config_target"
            />
          </label>
        </li>
      ))}
    </ul>
  );
};

export default TargetTabs;
