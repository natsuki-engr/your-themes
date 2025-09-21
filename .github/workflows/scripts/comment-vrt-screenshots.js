// @ts-check

const fs = require("fs");
const path = require("path");

/**
 * @param {string} dirPath
 * @param {string[]} arrayOfFiles
 * @returns {string[]}
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;

  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

/**
 * @param {import('@actions/github').context} context
 * @param {ReturnType<import('@actions/github').getOctokit>} github
 */
async function commentVRTScreenshots(context, github) {
  try {
    const screenshotDirs = [
      "./webview/.vitest-attachments",
      "./webview/test/vrt/__screenshots__",
    ];

    /** @type {string[]} */
    const allFiles = [];
    for (const dir of screenshotDirs) {
      if (fs.existsSync(dir)) {
        allFiles.push(...getAllFiles(dir));
      }
    }

    if (allFiles.length === 0) {
      console.log("No screenshot directories found");
      return;
    }

    const screenshots = allFiles.filter((f) => f.endsWith(".png"));

    if (screenshots.length === 0) {
      console.log("No screenshots found");
      return;
    }

    const diffScreenshots = screenshots.filter((f) => f.includes(".diff."));
    const actualScreenshots = screenshots.filter(
      (f) =>
        f.includes(".actual.") ||
        (!f.includes(".expected.") && !f.includes(".diff.")),
    );

    let comment = "## 📸 VRT Screenshots\n\n";

    if (diffScreenshots.length > 0) {
      comment += "### 🔍 Visual Changes Detected\n\n";
      for (const screenshot of diffScreenshots) {
        const filename = path.basename(screenshot);
        comment += `#### ${filename}\n`;
        comment += `![${filename}](${screenshot})\n\n`;
      }
    }

    if (actualScreenshots.length > 0) {
      comment += "### 📷 Current Screenshots\n\n";
      for (const screenshot of actualScreenshots) {
        const filename = path.basename(screenshot);
        comment += `#### ${filename}\n`;
        comment += `![${filename}](${screenshot})\n\n`;
      }
    }

    if (comment === "## 📸 VRT Screenshots\n\n") {
      return; // No screenshots to display
    }

    comment +=
      "\n---\n*Screenshots uploaded as artifacts and available for download*";

    // Find existing VRT screenshot comment
    const { data: comments } = await github.rest.issues.listComments({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.issue.number,
    });

    const vrtComment = comments.find(
      (comment) =>
        comment.user?.type === "Bot" &&
        comment.body?.includes("📸 VRT Screenshots"),
    );

    if (vrtComment) {
      // Update existing comment
      await github.rest.issues.updateComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        comment_id: vrtComment.id,
        body: comment,
      });
      console.log("Updated existing VRT screenshot comment");
    } else {
      // Create new comment
      await github.rest.issues.createComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
        body: comment,
      });
      console.log("Created new VRT screenshot comment");
    }
  } catch (error) {
    console.error("Error posting VRT screenshots:", error);

    // Post error comment
    await github.rest.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.issue.number,
      body:
        "## 📸 VRT Screenshots\n\n❌ **Error displaying screenshots**\n\n```\n" +
        (error instanceof Error ? error.message : String(error)) +
        "\n```",
    });
  }
}

module.exports = { commentVRTScreenshots };
