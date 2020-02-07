export const getPercentage = (start: Date, end: Date, now: Date) => {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const nowTime = now.getTime();
  return 100 * (nowTime - startTime) / (endTime - startTime);
};

// https://stackoverflow.com/a/11818658/4921052
export const truncateToDecimalPlaces = (input: number, decimalPlaces: number) => {
  const regex = new RegExp('^-?\\d+(?:\.\\d{0,' + (decimalPlaces || -1) + '})?');
  return input.toString().match(regex)![0];
};

export const getNumberOfDecimalPlaces = (totalMilliseconds: number) => {
  // The last digit will change at least every 2 seconds (and at most every 0.2 seconds)
  const maximumTimeBetweenSteps = 2000;
  const minimumNumberOfSteps = totalMilliseconds / maximumTimeBetweenSteps;
  const numberOfSignificantDigits = Math.ceil(Math.log10(minimumNumberOfSteps));
  // There will be 2 non-decimal places, we need 2 fewer decimal places than significant digits
  return Math.max(numberOfSignificantDigits - 2, 0);
};
