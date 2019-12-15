export const getPercentage = (start: Date, end: Date, now: Date) => {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const nowTime = now.getTime();
  return 100 * (nowTime - startTime) / (endTime - startTime);
}

const setPercentage = (elementsToUpdate: Element[], bar: HTMLElement | null, percentage: number) => {
  const textToShow = percentage.toFixed(6) + '%';
  elementsToUpdate.forEach(element => {
    element.innerHTML = textToShow;
  });
  if (bar) {
    bar.style.width = percentage + '%';
  }
}

export const initialiseProgressBar = (getProgress: () => number) => {
  const elementsToUpdate = Array.from(document.getElementsByClassName('progress-value'));
  const bar = document.getElementById('progress-bar');

  const update = () => setPercentage(elementsToUpdate, bar, getProgress());
  
  setInterval(update, 50);
  update();
}
