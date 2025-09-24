import { bold, red } from "ansis";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import themes from "./theme-projects.json" with { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function checkLatestRelease(extensionId: string): string | null {
  try {
    const output = execSync(`vsce show ${extensionId} --json`, {
      encoding: "utf8",
    });
    const info = JSON.parse(output) as unknown;

    if (
      typeof info !== "object" ||
      info === null ||
      !("versions" in info) ||
      !Array.isArray(info.versions)
    ) {
      throw new Error("unknown extension info format");
    }

    const topVersion = info.versions[0];
    if (
      typeof topVersion !== "object" ||
      topVersion === null ||
      !("version" in topVersion) ||
      typeof topVersion.version !== "string"
    ) {
      throw new Error("unknown extension info format");
    }

    return topVersion.version;
  } catch (err: unknown) {
    console.error(red(`  ERROR: ${err}`));
    return null;
  }
}

function main() {
  const fixtureDir = "../fixtures/themes";

  for (const theme of themes) {
    console.log(`loading ${theme["extension-id"]} ...`);

    for (const [themeName, url] of Object.entries(theme.themes)) {
      const saveDir = path.join(__dirname, fixtureDir, theme["extension-id"]);
      fs.mkdirSync(saveDir, { recursive: true });

      fetch(url)
        .then((res) => {
          if (res.status !== 200) {
            throw new Error(`HTTP error status: ${res.status}`);
          }

          return res.text();
        })
        .then((body) => {
          fs.writeFileSync(path.join(saveDir, `${themeName}.json`), body);
        })
        .catch((err) => {
          console.error(red(`  ERROR: ${err.message}`));
        });
    }

    const latestVersion = checkLatestRelease(theme["extension-id"]);
    if (latestVersion && latestVersion !== theme.version) {
      console.log(
        `  done (latest version is ${bold.bgRedBright(latestVersion)})`,
      );
    } else if (latestVersion !== null) {
      console.log(`  done (up to date ${bold.bgGreenBright(latestVersion)})`);
    }
  }
}

main();
