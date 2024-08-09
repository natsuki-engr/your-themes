import React from "react";
import { SvgColors } from "../../../src/types/svgColors";
import VscodeSvg from "./VscodeSvg";

interface Props {
  id?: string;
  label: string;
  colors: SvgColors | null;
  currentLabel: string;
  onSelect: (label: string) => void;
}

const ThemeCard: React.FC<Props> = ({
  label,
  colors,
  currentLabel,
  onSelect,
}) => {
  const changeHandler = (label: string) => {
    onSelect(label);
  };

  return (
    <label className="relative mb-6 w-80 shrink-0 cursor-pointer rounded border-2 border-solid border-transparent bg-opacity-20 p-4 hover:bg-[rgba(128,128,128,0.15)] has-[:checked]:bg-[rgba(128,128,128,0.15)] [&:has(input[type='radio']:checked)]:border-white">
      <input
        onChange={() => changeHandler(label)}
        name="theme_selector"
        value={label}
        checked={currentLabel === label}
        type="radio"
        className="pointer-events-none absolute opacity-0"
      />
      <h3 className="mb-2 mt-2 text-left">{label}</h3>
      <div className="h-[213px] w-full">
        {colors === null ? (
          <p>loading...</p>
        ) : (
          <VscodeSvg
            colors={colors?.colors}
            tokenColors={colors?.tokenColors}
          />
        )}
      </div>
    </label>
  );
};

export default ThemeCard;
