export const getPercentage = (start: Date, end: Date, now: Date) => {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const nowTime = now.getTime();
  return 100 * (nowTime - startTime) / (endTime - startTime);
}

const setPercentage = (elementsToUpdate: Element[], bar: HTMLElement | null, percentage: number, decimalPlaces: number) => {
  const textToShow = percentage.toFixed(decimalPlaces) + '%';
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

  setInterval(update, 50);
  update();
}
