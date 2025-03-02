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
    <ul className="bg-vscode-editor-background sideBarSectionHeader-border sticky top-0 z-10 flex h-12 w-full items-end gap-3 px-2 py-3">
      {targetList.map((t) => (
        <li className="block">
          <label className="has-[:checked]:bg-vscode-list-activeSelectionBackground bg-vscode-list-inactiveSelectionBackground hover:bg-vscode-button-secondaryHoverBackground text-vscode-button-secondaryForeground min-w-[100px] cursor-pointer rounded-md px-4 py-2 text-center font-medium transition-colors duration-200">
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
