import React from "react";
import VscodeSvg from "./VscodeSvg";
import { SvgColors } from "../../../src/types/svgColors";

interface Props {
	// colors: PreviewColors
	id?: string
	name: string
	label: string
	group: string
	colors: SvgColors | null
	onChange: (label: string) => void
}

const ThemeCard: React.FC<Props> = ({ id, name, label, group, colors, onChange }) => {
	return (
		<label className="relative mb-6 h-80 w-80 shrink-0 cursor-pointer rounded border-2 border-solid border-transparent bg-opacity-20 p-4 hover:bg-[rgba(128,128,128,0.15)] [&:has(input[type='radio']:checked)]:border-white">
			<input onChange={() => onChange(label)} type="radio" className="theme-selection pointer-events-none absolute opacity-0" />
			<div className="text-left">id: {id}</div>
			<div className="text-left">label: {label}</div>
			<div className="text-left">name: {name}</div>
			<div className="text-left">group: {group}</div>
			<VscodeSvg colors={colors} />
		</label>
	)
};

export default ThemeCard;
