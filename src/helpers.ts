export const getPercentage = (start: Date, end: Date, now: Date) => {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const nowTime = now.getTime();
  return 100 * (nowTime - startTime) / (endTime - startTime);
}

// https://stackoverflow.com/a/11818658/4921052
export const truncateToDecimalPlaces = (input: number, decimalPlaces: number) => {
  var regex = new RegExp('^-?\\d+(?:\.\\d{0,' + (decimalPlaces || -1) + '})?');
  return input.toString().match(regex)![0];
}
