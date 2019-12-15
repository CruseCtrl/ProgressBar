import { startOfYear, endOfYear } from 'date-fns';
import { initialiseProgressBar, getPercentage } from './scripts';

window.onload = () => {
  const elementsToUpdate = Array.from(document.getElementsByClassName('progress-value'));
  const bar = document.getElementById('progress-bar');

  const getYearPercentage = () => {
    const now = new Date();
    return getPercentage(startOfYear(now), endOfYear(now), now);
  }

  initialiseProgressBar(elementsToUpdate, bar, getYearPercentage);
};
