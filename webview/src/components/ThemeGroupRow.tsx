import ThemeCard from "./ThemeCard";

import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import {
  ConfigTarget,
  ConfigTargetValueType,
} from "../../../src/types/ConfigTarget";
import { SvgColors } from "../../../src/types/svgColors";
import { ThemeGroupInfo, ThemeInfo } from "../../../src/types/themeInfo";
import linkIconSrc from "../assets/link-external.svg";
import { getColorInfo } from "../controllers/getColorInfo";
import {
  getCurrentThemeLabel,
  command as getCurrentThemeLabelCommand,
} from "../controllers/getCurrentThemeLabel";
import MessageListener from "../controllers/messageListener";
import { updateColorSetting } from "../controllers/updateColorSetting";
import { useStaticSWR } from "../stores/useStaticSWR";

interface Props {
  group: ThemeGroupInfo;
}

const ThemeGroupRow: React.FC<Props> = ({ group }) => {
  const [colorByLabel, setColorByLabel] = useState<Record<string, SvgColors>>(
    {},
  );

  const { data: target } = useStaticSWR<ConfigTargetValueType>(
    "config-target",
    ConfigTarget.User,
  );

  const { data: currentThemeLabel, mutate: mutateCurrentThemeLabel } = useSWR(
    [getCurrentThemeLabelCommand, target],
    ([command, target]) => {
      return getCurrentThemeLabel(command, target);
    },
  );

  const handleThemeSelect = async (label: string) => {
    const messageListener = new MessageListener();
    mutateCurrentThemeLabel(label, false);
    await updateColorSetting(messageListener, label, target);
    mutate([getCurrentThemeLabelCommand, target]);
  };

  useEffect(() => {
    const messageListener = new MessageListener();

    const getEachColorTheme = async () => {
      const themePathListByLabel: Record<
        ThemeInfo["label"],
        { path: ThemeInfo["path"]; uiTheme: ThemeInfo["uiTheme"] }
      > = {};
      for (const theme of group.themes) {
        themePathListByLabel[theme.label] = {
          path: theme.path,
          uiTheme: theme.uiTheme,
        };
      }

      const groupColors = await getColorInfo(
        messageListener,
        group.themeDir,
        themePathListByLabel,
      );
      setColorByLabel(groupColors);
    };

    getEachColorTheme();

    return () => {
      messageListener.unsubscribe();
    };
  }, [group.themeDir, group.themes]);

  const marketPlaceUrl = `https://marketplace.visualstudio.com/items?itemName=${group.id}`;
  const isBuiltin = group.isBuiltin;

  return (
    <>
      <h2
        className="text-2 mb-2 mt-2 flex items-end gap-2 text-xl leading-none"
        data-is-built-in={isBuiltin}
      >
        {group.displayName}
        {isBuiltin ? (
          <span className="text-sm leading-none opacity-60">[built-in]</span>
        ) : (
          <a
            href={marketPlaceUrl}
            title="Go to Marketplace"
            data-mask-image={linkIconSrc}
            className="block size-4 bg-current"
            style={{
              maskImage: `url("${linkIconSrc}")`,
              maskSize: "contain",
              maskRepeat: "no-repeat",
            }}
          ></a>
        )}
      </h2>
      <div className="flex flex-wrap">
        {group.themes.map((theme) => {
          return (
            <ThemeCard
              id={theme.id}
              label={theme.label}
              colors={colorByLabel[theme.label] ?? null}
              currentLabel={currentThemeLabel ?? ""}
              onSelect={handleThemeSelect}
            ></ThemeCard>
          );
        })}
      </div>
      <hr className="group bg-[rgba(128,128,128,0.15)] last-of-type:invisible" />
    </>
  );
};

export default ThemeGroupRow;
