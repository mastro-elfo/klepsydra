const fs = require("fs");

// Check arguments
if (process.argv.length < 4) {
  console.error("Expected two language codes");
  process.exit();
}

const fromLng = process.argv[2];
const toLng = process.argv[3];

// Check base language
if (!fs.existsSync(`./public/locales/${fromLng}/translation.json`)) {
  console.error("Base language doesn't have a translation.json file");
  process.exit();
}

// Check target language
if (!fs.existsSync(`./public/locales/${toLng}/translation.json`)) {
  console.error("Target language doesn't exists");
  process.exit();
}

// Read base language
const base = require(`../public/locales/${fromLng}/translation.json`);
// console.log(base);

// Read target language
const target = require(`../public/locales/${toLng}/translation.json`);

function compare(path, baseLng, targetLng) {
  Object.keys(baseLng).forEach((item) => {
    if (typeof baseLng[item] === "object") {
      return compare([...path, item], baseLng[item], targetLng[item]);
    }
    if (targetLng[item] === undefined) {
      console.log([...path, item].join("."));
    }
  });
}

compare("", base, target);
