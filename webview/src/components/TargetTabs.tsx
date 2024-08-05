import React, { useEffect, useState } from "react";
import { mutate } from "swr";
import { ConfigTarget, ConfigTargetValueType } from "../../../src/types/ConfigTarget";
import { useStaticSWR } from "../stores/useStaticSWR";
import MessageListener from "../controllers/messageListener";
import { getConfigTargets } from "../controllers/getConfigTargets";

const TargetTabs: React.FC = () => {
  const { data: target, mutate: setTarget } = useStaticSWR<ConfigTargetValueType>("config-target", ConfigTarget.User);
  const [workspaceFolders, setWorkspaceFolders] = useState<Array<{ name: string; index: number }>>([]);

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

  return (
    <ul className="bg-vscode-editor-background sideBarSectionHeader-border sticky top-0 z-10 flex h-12 w-full items-end pe-2 ps-2 pt-2">
      <li className="block">
        <label className="block cursor-pointer border-2 border-solid border-transparent p-3 has-[:checked]:border-b-[var(--vscode-settings-sashBorder)]">
          User
          <input
            onChange={() => changeHandler(ConfigTarget.User)}
            className="pointer-events-none absolute opacity-0"
            type="radio"
            value={ConfigTarget.User}
            checked={target === ConfigTarget.User}
            name="config_target"
          />
        </label>
      </li>
      {workspaceFolders.length ? (
        <li className="block">
          <label className="block cursor-pointer border-2 border-solid border-transparent p-3 has-[:checked]:border-b-white">
            Workspace
            <input
              onChange={() => changeHandler(ConfigTarget.Workspace)}
              className="pointer-events-none absolute opacity-0"
              type="radio"
              value={ConfigTarget.Workspace}
              checked={target === ConfigTarget.Workspace}
              name="config_target"
            />
          </label>
        </li>
      ) : (
        <></>
      )}
    </ul>
  );
};

export default TargetTabs;
