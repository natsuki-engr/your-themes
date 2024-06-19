import React from "react";
import VscodeSvg from "./VscodeSvg";
import { SvgColors } from "../../../src/types/svgColors";

interface Props {
	id?: string
	label: string
	colors: SvgColors | null
	onChange: (label: string) => void
}

const ThemeCard: React.FC<Props> = ({ label, colors, onChange }) => {
	return (
		<label className="relative mb-6 w-80 shrink-0 cursor-pointer rounded border-2 border-solid border-transparent bg-opacity-20 p-4 hover:bg-[rgba(128,128,128,0.15)] [&:has(input[type='radio']:checked)]:border-white">
			<input onChange={() => onChange(label)} type="radio" className="theme-selection pointer-events-none absolute opacity-0" />
			<h3 className="mb-2 mt-2 text-left">{label}</h3>
			<VscodeSvg colors={colors} />
		</label>
	)
};

export default ThemeCard;
