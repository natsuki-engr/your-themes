import { red } from "ansis";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import themes from "./theme-projects.json" with { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function main() {
  const fixtureDir = "../fixtures/themes";

  for (const theme of themes) {
    console.log(`loading ${theme["repo-name"]} ...`);

    for (const [themeName, url] of Object.entries(theme.themes)) {
      const saveDir = path.join(__dirname, fixtureDir, theme["repo-name"]);
      fs.mkdirSync(saveDir, { recursive: true });

      fetch(url)
        .then((res) => {
          if (res.status !== 200) {
            throw new Error(`HTTP error status: ${res.status}`);
          }

          const contentType = res.headers.get("content-type");
          console.log("contentType", contentType);

          return res.text();
        })
        .then((body) => {
          fs.writeFileSync(path.join(saveDir, `${themeName}.json`), body);
        })
        .catch((err) => {
          console.error(red(`  - ${themeName}: ERROR: ${err.message}`));
        });
    }
  }
}

main();
