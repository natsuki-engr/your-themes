// interface PreviewColors {
// 	background: string
// 	statusbar: string
// }

import React from "react";
import VscodeSvg from "./VscodeSvg";

interface Props {
	// colors: PreviewColors
	id?: string
	name: string
	label: string
	group: string
	onChange: (label: string) => void
}

const colors = {
	"tab.activeBackground": "#19433f",
	"tab.activeForeground": "#FF0",
	"tab.inactiveBackground": "#000",
	"tab.inactiveForeground": "#FFF",
	"contrastActiveBorder": "#FF0",
	"sideBar.background": "#000",
	"editor.background": "#000",
	"activityBar.background": "#000",
	"activityBar.foreground": "#FF0",
	"activityBarBadge.background": "#000",
	"activityBarBadge.foreground": "#FFF",
	"contrastBorder": "#0FF",
	"statusBar.background": "#000",
	"statusBar.foreground": "#FFF",
	"titleBar.activeBackground": "#000",
	"titleBar.border": "#ff0000",
}

const ThemeCard: React.FC<Props> = ({ id, name, label, group, onChange }) => {
	
	return (
		<label className="relative mb-6 h-80 w-80 shrink-0 cursor-pointer rounded border-2 border-solid border-transparent bg-opacity-20 hover:bg-neutral-500 [&:has(input[type='radio']:checked)]:border-white">
			<input onChange={() => onChange(label)} type="radio" name="theme-selection opacity-0 absolute pointer-events-none" />
			<div className="text-left">id: {id}</div>
			<div className="text-left">label: {label}</div>
			<div className="text-left">name: {name}</div>
			<div className="text-left">group: {group}</div>
			<VscodeSvg colors={colors} />
		</label>
	)
};

export default ThemeCard;
