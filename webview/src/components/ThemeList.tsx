import { ThemeGroupInfo } from "../../../src/types/themeInfo";
import { updateColorSetting } from "../controllers/updateColorSetting";
import ThemeGroupRow from "./ThemeGroupRow";

const ThemeList = ({ themeGroups }: { themeGroups: ThemeGroupInfo[] }) => {
  const changeHandler = (label: string) => {
    updateColorSetting(label, "user");
  };

  return (
    <div className="mb-2">
      {themeGroups.map((group) => (
        <ThemeGroupRow group={group} changeHandler={changeHandler} />
      ))}
    </div>
  );
};

export default ThemeList;
