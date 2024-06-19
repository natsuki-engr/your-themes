import { ThemeGroupInfo } from "../../../src/types/themeInfo";
import ThemeGroupRow from "./ThemeGroupRow";

const ThemeList = ({ themeGroups }: { themeGroups: ThemeGroupInfo[] }) => {
  return (
    <div className="mb-2">
      {themeGroups.map((group) => (
        <ThemeGroupRow group={group} />
      ))}
    </div>
  );
};

export default ThemeList;
