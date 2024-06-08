import postMessage from "./postMessage";

export const getThemeList = () => {
	postMessage.send('get-theme-list')
}
