const { version } = require("../package.json");
const { writeFileSync } = require("fs");

// Initialize file src/version.json
writeFileSync("src/version.json", JSON.stringify({ version }));
