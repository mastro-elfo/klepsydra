/**
 * Evaluates the time difference between start and end and subtract the pauses
 * @param  {Date} start
 * @param  {Date} end
 * @param  {array} pauses
 * @return {number}
 */
export function timeDiff(start, end, pauses = []) {
  return pauses.reduce(
    (acc, { start, end }) => acc - (end ? new Date(end) - new Date(start) : 0),
    new Date(end) - new Date(start)
  );
}

export function delta2hms(delta) {
  try {
    return new Date(delta).toISOString().substr(11, 8);
    // return new Date(delta).toLocaleTimeString();
  } catch {
    return "00:00:00";
  }
}

export function roundCost(cost, value) {
  if (cost <= value) {
    return 0;
  }
  return cost % value;
}
