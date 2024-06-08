import { ThemeGroupInfo } from "../../../src/types/themeInfo"

const ThemeList = ({ themeGroups }: { themeGroups: ThemeGroupInfo[]}) => {
	return (
    <div>
			{themeGroups.map(group => {
				return <span>{group.id}</span>
			})}
    </div>
  );

}

export default ThemeList
