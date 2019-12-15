export const getPercentage = (start: Date, end: Date, now: Date) => {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const nowTime = now.getTime();
  return 100 * (nowTime - startTime) / (endTime - startTime);
}

// https://stackoverflow.com/a/11818658/4921052
const truncateToDecimalPlaces = (input: number, decimalPlaces: number) => {
  var regex = new RegExp('^-?\\d+(?:\.\\d{0,' + (decimalPlaces || -1) + '})?');
  return input.toString().match(regex)![0];
}

const setPercentage = (elementsToUpdate: Element[], bar: HTMLElement | null, percentage: number, decimalPlaces: number) => {
  const textToShow = truncateToDecimalPlaces(percentage, decimalPlaces) + '%';
  elementsToUpdate.forEach(element => {
    element.innerHTML = textToShow;
  });
  if (bar) {
    bar.style.width = percentage + '%';
  }
}

export const initialiseProgressBar = (getProgress: () => number, decimalPlaces: number) => {
  const elementsToUpdate = Array.from(document.getElementsByClassName('progress-value'));
  const bar = document.getElementById('progress-bar');

  const update = () => setPercentage(elementsToUpdate, bar, getProgress(), decimalPlaces);

  setInterval(update, 40); // 25 times per second
  update();
}
