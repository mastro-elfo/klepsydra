const { LocalStorageBackendOptions } = require("../src/i18n.json");
if (LocalStorageBackendOptions.expirationTime !== undefined) {
  console.error(
    "Don't overwrite default expirationTime in production",
    LocalStorageBackendOptions.expirationTime
  );
  process.exit(1);
}
