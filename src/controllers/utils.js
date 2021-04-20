export function merge(defaultValue, ...data) {
  const keys = Object.keys(defaultValue);
  const newObject = Object.assign(defaultValue, ...data);
  return Object.keys(newObject)
    .filter((k) => keys.indexOf(k) !== -1)
    .reduce((acc, curr) => ({ ...acc, [curr]: newObject[curr] }), {});
}
