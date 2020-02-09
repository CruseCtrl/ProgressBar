export const getPercentage = (start: Date, end: Date, now: Date) => {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const nowTime = now.getTime();
  const percentage = 100 * (nowTime - startTime) / (endTime - startTime);
  if (percentage < 0) {
    return 0;
  } else if (percentage > 100) {
    return 100;
  } else {
    return percentage;
  }
};

// https://stackoverflow.com/a/11818658/4921052
export const truncateToDecimalPlaces = (input: number, decimalPlaces: number) => {
  const regex = new RegExp('^-?\\d+(?:\.\\d{0,' + (decimalPlaces || -1) + '})?');
  return input.toString().match(regex)![0];
};

// The last digit will change at least every 2 seconds (and at most every 0.2 seconds)
const maximumTimeBetweenSteps = 2000;

export const getNumberOfDecimalPlaces = (totalMilliseconds: number) => {
  const minimumNumberOfSteps = totalMilliseconds / maximumTimeBetweenSteps;
  const numberOfSignificantDigits = Math.ceil(Math.log10(minimumNumberOfSteps));
  // There will be 2 non-decimal places, so we need 2 fewer decimal places than significant digits
  return Math.max(numberOfSignificantDigits - 2, 0);
};
