export function closeTo(actual, expected, precision = 2) {
  return Math.abs(expected - actual) < Math.pow(10, -precision) / 2;
}
