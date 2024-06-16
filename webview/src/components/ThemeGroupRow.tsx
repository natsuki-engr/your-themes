import ThemeCard from "./ThemeCard";

import { getColorInfo } from "../controllers/getColorInfo";
import { ThemeGroupInfo, ThemeInfo } from "../../../src/types/themeInfo";
import { useEffect, useState } from "react";
import { SvgColors } from "../../../src/types/svgColors";
import MessageListener from "../controllers/messageListener";

interface Props {
  group: ThemeGroupInfo;
  changeHandler: (label: string) => void;
}

const ThemeGroupRow: React.FC<Props> = ({ group, changeHandler }) => {
  const [colorByLabel, setColorByLabel] = useState<Record<string, SvgColors>>({});

  useEffect(() => {
    const messageListener = new MessageListener();

    const getEachColorTheme = async () => {
      const themePathListByLabel: Record<ThemeInfo["label"], ThemeInfo["path"]> = {};
      for (const theme of group.themes) {
        themePathListByLabel[theme.label] = theme.path;
      }

      const groupColors = await getColorInfo(messageListener, group.themeDir, themePathListByLabel);
      setColorByLabel(groupColors)
    };

    getEachColorTheme();

    return () => {
      messageListener.unsubscribe();
    };
  }, [group.themeDir, group.themes]);

  return (
    <div className="flex flex-wrap">
      {group.themes.map((theme) => {
        return (
          <ThemeCard
            id={theme.id}
            name={theme.label}
            label={theme.label}
            group={group.id}
            colors={colorByLabel[theme.label] ?? null}
            onChange={changeHandler}
          ></ThemeCard>
        );
      })}
    </div>
  );
};

export default ThemeGroupRow;
