import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { defaultColors } from "../../../src/defaults";
import { SvgColors } from "../../../src/types/svgColors";
import VscodeSvg from "../../src/components/VscodeSvg";

test.each(["dark", "light", "hcDark", "hcLight"] as const)(
  "render default %s color theme",
  async (themeType) => {
    const colors = Object.keys(defaultColors).reduce(
      (acc, key) => {
        const k = key as keyof SvgColors["colors"];
        acc[k] = defaultColors[k][themeType] ?? "transparent";
        return acc;
      },
      {} as Record<keyof SvgColors["colors"], string>,
    );

    const { container } = await render(
      <VscodeSvg colors={colors} tokenColors={{}} />,
    );

    await expect(container).toMatchScreenshot(`VscodeSvg.${themeType}.png`);
  },
);
