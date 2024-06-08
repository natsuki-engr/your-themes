import { ThemeGroupInfo } from "../../../src/types/themeInfo";
import { updateColorSetting } from "../controllers/updateColorSetting";
import ThemeCard from "./ThemeCard";

const ThemeList = ({ themeGroups }: { themeGroups: ThemeGroupInfo[] }) => {
  const changeHandler = (label: string) => {
    updateColorSetting(label, "user");
  };

  return (
    <div className="mb-2">
      {themeGroups.map((group) => {
        return (
          <div className="flex flex-wrap">
            {group.themes.map((theme) => {
              return (
                <ThemeCard
                  id={theme.id}
                  name={theme.label}
                  label={theme.label}
                  group={group.id}
                  onChange={changeHandler}
                ></ThemeCard>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ThemeList;
