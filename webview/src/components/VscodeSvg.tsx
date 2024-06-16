import React from "react";
import { SvgColors } from "../../../src/types/svgColors";

export interface Props {
	colors: SvgColors | null
}

const VscodeSvg: React.FC<Props> = ({ colors }) => {
	const editorStyle = {
		fill: colors?.["editor.background"],
	}

	const sideBarStyle = {
		fill: colors?.["sideBar.background"],
		stroke: colors?.["contrastBorder"],
	}

	const tabBgStyle = {
		fill: colors?.["editor.background"],
		stroke: colors?.["contrastBorder"],
	}

	const tab1Style = {
		fill: colors?.["tab.inactiveBackground"],
		stroke: colors?.["contrastBorder"],
	}

	const tab2Style = {
		fill: colors?.["tab.inactiveBackground"],
		stroke: colors?.["contrastBorder"],
	}

	const tab3Style = {
		fill: colors?.["tab.inactiveBackground"],
		stroke: colors?.["contrastBorder"],
	}

	const activeTab1Style = {
		fill: colors?.["tab.inactiveBackground"],
		stroke: colors?.["contrastActiveBorder"],
	}

	const activityBarStyle = {
		fill: colors?.["activityBar.background"],
	}

	const titleBarStyle = {
		fill: colors?.["titleBar.activeBackground"],
		stroke: colors?.["contrastBorder"],
	}

	const statusBarStyle = {
		fill: colors?.["statusBar.background"],
		stroke: colors?.["contrastBorder"],
	}

	return (
		<svg id="_レイヤー_2" data-name="レイヤー 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 961 721">
			<defs>
				<style>{"rect, path { fill: white; }"}</style>
			</defs>
			<g id="_レイヤー_1-2" data-name="レイヤー 1">
				<rect id="editor" x=".5" y=".5" width="960" height="720" rx="22.34" ry="22.34" style={editorStyle}/>
				<rect id="side-bar" x="80.5" y="70.5" width="175" height="590" style={sideBarStyle} />
				<rect id="tab-bg" x="255.5" y="70.5" width="705" height="55" style={tabBgStyle} />
				<rect id="tab1" x="255.5" y="70.5" width="180" height="55" style={tab1Style} />
				<rect id="tab2" x="435.5" y="70.5" width="180" height="55" style={tab2Style} />
				<rect id="tab3" x="615.5" y="70.5" width="180" height="55" style={tab3Style} />
				<rect id="active-tab" x="265.5" y="80.5" width="160" height="35" style={activeTab1Style} />
				<rect id="activity-bar" x=".5" y="70.5" width="80" height="590" style={activityBarStyle} />
				<path id="title-bar" d="M22.84.5h915.32c12.33,0,22.34,10.01,22.34,22.34v47.66H.5V22.84C.5,10.51,10.51.5,22.84.5Z" style={titleBarStyle}/>
				<path id="status-bar" d="M22.84,660.5h915.32c12.33,0,22.34,10.01,22.34,22.34v37.66H.5v-37.66c0-12.33,10.01-22.34,22.34-22.34Z" transform="translate(961 1381) rotate(180)" style={statusBarStyle}/>
			</g>
		</svg>	)
}

export default VscodeSvg
