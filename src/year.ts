import { startOfYear, endOfYear } from 'date-fns';

window.onload = () => {
  const elementsToUpdate = Array.from(document.getElementsByClassName('progress-value'));
  const bar = document.getElementById('progress-bar');

  const getYearPercentage = () => {
    const now = new Date();
    return getPercentage(startOfYear(now), endOfYear(now), now);
  }

  const getPercentage = (start: Date, end: Date, now: Date) => {
    const startTime = start.getTime();
    const endTime = end.getTime();
    const nowTime = now.getTime();
    return 100 * (nowTime - startTime) / (endTime - startTime);
  }

  const setPercentage = (percentage: number) => {
    const textToShow = percentage.toFixed(6) + '%';
    elementsToUpdate.forEach(element => {
      element.innerHTML = textToShow;
    });
    if (bar) {
      bar.style.width = percentage + '%';
    }
  }

  const update = () => {
    setPercentage(getYearPercentage());
  }

  setInterval(update, 50);
  update();
};
