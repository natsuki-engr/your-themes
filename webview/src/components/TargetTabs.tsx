import React from "react";
import { mutate } from "swr";
import { ConfigTarget, ConfigTargetValueType } from "../../../src/types/ConfigTarget";
import { useStaticSWR } from "../stores/useStaticSWR";

const TargetTabs: React.FC = () => {
  const { data: target, mutate: setTarget } = useStaticSWR<ConfigTargetValueType>("config-target", ConfigTarget.User);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (Object.values(ConfigTarget).some((v) => v === value)) {
      setTarget(value as ConfigTargetValueType);
    }
    mutate((key) => key === "get-current-theme-label", undefined, true);
  };

  return (
    <ul className="bg-vscode-editor-background sideBarSectionHeader-border sticky top-0 z-10 flex h-12 w-full items-end pe-2 ps-2 pt-2">
      <li className="block">
        <label className="block cursor-pointer border-2 border-solid border-transparent p-3 has-[:checked]:border-b-white">
          User
          <input
            onChange={changeHandler}
            className="pointer-events-none absolute opacity-0"
            type="radio"
            value={ConfigTarget.User}
            checked={target === ConfigTarget.User}
            name="config_target"
          />
        </label>
      </li>
      <li className="block">
        <label className="block cursor-pointer border-2 border-solid border-transparent p-3 has-[:checked]:border-b-white">
          Workspace
          <input
            onChange={changeHandler}
            className="pointer-events-none absolute opacity-0"
            type="radio"
            value={ConfigTarget.Workspace}
            checked={target === ConfigTarget.Workspace}
            name="config_target"
          />
        </label>
      </li>
      <li className="block">
        <label className="block cursor-pointer border-2 border-solid border-transparent p-3 has-[:checked]:border-b-white">
          Folder
          <input
            onChange={changeHandler}
            className="pointer-events-none absolute opacity-0"
            type="radio"
            value={ConfigTarget.Folder}
            checked={target === ConfigTarget.Folder}
            name="config_target"
          />
        </label>
      </li>
    </ul>
  );
};

export default TargetTabs;
