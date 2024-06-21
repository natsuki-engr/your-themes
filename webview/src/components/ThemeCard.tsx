import React from "react";
import VscodeSvg from "./VscodeSvg";
import { SvgColors } from "../../../src/types/svgColors";
import useSWR from "swr";
import { command as getCurrentThemeLabelCommand, getCurrentThemeLabel } from "../controllers/getCurrentThemeLabel";
import { updateColorSetting } from "../controllers/updateColorSetting";

interface Props {
  id?: string;
  label: string;
  colors: SvgColors | null;
}

const ThemeCard: React.FC<Props> = ({ label, colors }) => {
  const { data: currentThemeLabel, mutate } = useSWR(getCurrentThemeLabelCommand, (command) => {
    return getCurrentThemeLabel(command);
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
        className="pointer-events-none absolute opacity-0"
      />
      <h3 className="mb-2 mt-2 text-left">{label}</h3>
      <VscodeSvg colors={colors} />
    </label>
  );
};

export default ThemeCard;
