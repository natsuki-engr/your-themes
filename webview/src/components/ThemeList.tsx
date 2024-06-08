import { ThemeGroupInfo } from "../../../src/types/themeInfo";
import ThemeCard from "./ThemeCard";

const ThemeList = ({ themeGroups }: { themeGroups: ThemeGroupInfo[] }) => {
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
