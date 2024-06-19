import React from "react";
import VscodeSvg from "./VscodeSvg";
import { SvgColors } from "../../../src/types/svgColors";
import useSWR from "swr";
import MessageListener from "../controllers/messageListener";
import { getCurrentThemeLabel } from "../controllers/getCurrentThemeLabel";
import { updateColorSetting } from "../controllers/updateColorSetting";

interface Props {
  id?: string;
  label: string;
  colors: SvgColors | null;
}

const ThemeCard: React.FC<Props> = ({ label, colors }) => {
  const command = "get-current-theme-label";
  const { data: currentThemeLabel, mutate } = useSWR(command, (command) => {
    const messageListener = new MessageListener();
    return getCurrentThemeLabel(command, messageListener);
  });

  const changeHandler = (label: string) => {
    updateColorSetting(label, "user");
    mutate(label, false)
  };

  return (
    <label className="relative mb-6 w-80 shrink-0 cursor-pointer rounded border-2 border-solid border-transparent bg-opacity-20 p-4 hover:bg-[rgba(128,128,128,0.15)] has-[:checked]:bg-[rgba(128,128,128,0.15)] [&:has(input[type='radio']:checked)]:border-white">
      <span>current: {currentThemeLabel}</span>
      <input
        onChange={() => changeHandler(label)}
        name="theme_selector"
        value={label}
        checked={currentThemeLabel === label}
        type="radio"
        className="theme-selection pointer-events-none absolute opacity-0"
      />
      <h3 className="mb-2 mt-2 text-left">{label}</h3>
      <VscodeSvg colors={colors} />
    </label>
  );
};

export default ThemeCard;
