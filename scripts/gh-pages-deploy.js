/*
 * File: gh-pages-deploy.js
 * Project: timo
 * File Created: Monday, 21st September 2020 8:14:19 pm
 * Author: Timo Zacherl
 * License: MPL-2.0
 *
 * -----
 * Last Modified: Monday, 21st September 2020 8:22:36 pm
 * Modified By: Timo Zacherl
 * -----
 *
 * Copyright © 2020 Timo Zacherl. All rights reserved.
 */

const execa = require("execa");
const fs = require("fs");

(async () => {
  try {
    await execa("git", ["checkout", "--orphan", "gh-pages"]);

    console.log("Building started...");
    await execa("npm", ["run", "build"]);

    const folderName = fs.existsSync("dist") ? "dist" : "build";
    await execa("git", ["--work-tree", folderName, "add", "--all"]);
    await execa("git", ["--work-tree", folderName, "commit", "-m", "gh-pages"]);

    console.log("Pushing to gh-pages...");
    await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);
    await execa("rm", ["-r", folderName]);
    await execa("git", ["checkout", "-f", "master"]);
    await execa("git", ["branch", "-D", "gh-pages"]);
    console.log("Successfully deployed, check settings");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
})();
