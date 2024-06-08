// interface PreviewColors {
// 	background: string
// 	statusbar: string
// }

import React from "react";

interface Props {
	// colors: PreviewColors
	id?: string
	name: string
	label: string
	group: string
	onChange: (label: string) => void
}

const ThemeCard: React.FC<Props> = ({ id, name, label, group, onChange }) => {
	
	return (
		<label className="relative mb-6 h-80 w-80 shrink-0 cursor-pointer rounded border-2 border-solid border-transparent bg-opacity-20 hover:bg-neutral-500 [&:has(input[type='radio']:checked)]:border-white">
			<input onChange={() => onChange(label)} type="radio" name="theme-selection opacity-0 absolute pointer-events-none" />
			<div className="text-left">id: {id}</div>
			<div className="text-left">label: {label}</div>
			<div className="text-left">name: {name}</div>
			<div className="text-left">group: {group}</div>
			<ul>
				{/* {Object.keys(colors).map((key: string) => (
					<li>
						<span>{key}: </span>
						<span>{colors[key as keyof PreviewColors] ?? ''}</span>
					</li>
				))} */}
			</ul>
		</label>
	)
};

export default ThemeCard;
