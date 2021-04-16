const { version } = require("../package.json");
const { writeFileSync } = require("fs");
writeFileSync("src/version.json", JSON.stringify({ version }));
