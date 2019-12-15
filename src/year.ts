import { startOfYear, endOfYear } from 'date-fns';
import { initialiseProgressBar, getPercentage } from './scripts';

window.onload = () => {
  const getYearPercentage = () => {
    const now = new Date();
    return getPercentage(startOfYear(now), endOfYear(now), now);
  }

  initialiseProgressBar(getYearPercentage);
};
