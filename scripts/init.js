const { version } = require("../package.json");
const { writeFileSync } = require("fs");
const { execSync } = require("child_process");

// console.log(process.argv);

// Initialize file src/version.json
writeFileSync("src/version.json", JSON.stringify({ version }));

// Get current branch name
const branch = execSync("git branch --show-current", {
  encoding: "utf-8",
}).trim();
if (process.argv.includes("--dev") && branch !== "develop") {
  console.warn("WARN Current branch:", branch);
}
