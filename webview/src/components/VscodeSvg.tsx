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
		stroke: colors?.["sideBar.border"],
	}

	const tabBgStyle = {
		fill: colors?.["editorGroupHeader.tabsBackground"] ?? "#0000",
		stroke: colors?.["editorGroupHeader.tabsBorder"] ?? "#0000",
	}

	const tab1Style = {
		fill: colors?.["tab.inactiveBackground"],
		stroke: colors?.["tab.border"],
	}

	const tab2Style = {
		fill: colors?.["tab.inactiveBackground"],
		stroke: colors?.["tab.border"],
	}

	const tab3Style = {
		fill: colors?.["tab.inactiveBackground"],
		stroke: colors?.["tab.border"],
	}

	const activeTab1Style = {
		fill: colors?.["tab.activeBackground"],
		stroke: colors?.["focusBorder"],
	}

	const activityBarStyle = {
		fill: colors?.["activityBar.background"],
		stroke: colors?.["activityBar.border"],
	}

	const titleBarStyle = {
		fill: colors?.["titleBar.activeBackground"],
		stroke: colors?.["titleBar.border"],
	}

	const statusBarStyle = {
		fill: colors?.["statusBar.background"],
		stroke: colors?.["statusBar.border"],
	}

  const activityIconStyle = {
    fill: colors?.["activityBar.foreground"],
  }

	return (
		<svg id="_レイヤー_2" data-name="レイヤー 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 961 721">
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

					<path style={activityIconStyle} d="M51.52,96.23h-18.17l-3.03,3.03v9.09h-9.09l-3.03,3.03v30.43l3.03,2.89h24.37l2.89-2.89v-9.23h9.49l2.63-2.89v-24.37l-9.09-9.09ZM51.52,100.51l4.81,4.81h-4.81v-4.81ZM45.46,141.67h-24.23v-30.29h9.09v18.32l3.03,2.89h12.12v9.09ZM57.58,129.55h-24.23v-30.29h15.15v9.09h9.09v21.2Z"/>
					<path style={activityIconStyle} d="M45.45,170.6c-9.2,0-16.66,7.45-16.67,16.65,0,4.07,1.49,8.01,4.19,11.05l-16.3,18.5,2.26,2.02,16.26-18.42c7.25,5.67,17.72,4.39,23.39-2.86,5.67-7.25,4.39-17.72-2.86-23.39-2.93-2.29-6.55-3.54-10.27-3.54v-.02ZM45.45,200.89c-7.53,0-13.63-6.1-13.63-13.63s6.1-13.63,13.63-13.63,13.63,6.1,13.63,13.63-6.1,13.63-13.63,13.63Z"/>
					<path style={activityIconStyle} d="M57.59,261.33c.02-4.17-3.34-7.56-7.51-7.58-1.63,0-3.22.51-4.53,1.48-3.35,2.48-4.05,7.21-1.57,10.56.97,1.31,2.34,2.27,3.9,2.74-1.01,2.06-3.1,3.36-5.39,3.37h-6.04c-2.23,0-4.39.85-6.04,2.35v-14.58c4.08-.83,6.72-4.82,5.89-8.9-.83-4.08-4.82-6.72-8.9-5.89-4.08.83-6.72,4.82-5.89,8.9.6,2.96,2.92,5.28,5.89,5.89v18.41c-4.14.79-6.85,4.78-6.06,8.92.79,4.14,4.78,6.85,8.92,6.06,4.14-.79,6.85-4.78,6.06-8.92-.53-2.78-2.55-5.03-5.25-5.86,1.01-2.05,3.1-3.36,5.39-3.37h6.04c3.86-.02,7.28-2.48,8.53-6.14,3.74-.49,6.55-3.67,6.56-7.45h0ZM24.39,252.28c0-2.5,2.02-4.53,4.53-4.53,2.5,0,4.53,2.02,4.53,4.53h0c0,2.5-2.03,4.53-4.53,4.53-2.5,0-4.53-2.03-4.53-4.53ZM33.44,285.48c0,2.5-2.03,4.53-4.53,4.53s-4.53-2.03-4.53-4.53h0c0-2.5,2.03-4.53,4.53-4.53,2.5,0,4.53,2.03,4.53,4.53ZM50.04,265.86c-2.5,0-4.53-2.03-4.53-4.53s2.03-4.53,4.53-4.53,4.53,2.03,4.53,4.53-2.03,4.53-4.53,4.53Z"/>
			</g>
		</svg>	)
}

export default VscodeSvg
