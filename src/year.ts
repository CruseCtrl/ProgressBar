import { startOfYear, addYears } from 'date-fns';
import { initialiseProgressBar, getPercentage } from './scripts';

window.onload = () => {
  const getYearPercentage = () => {
    const now = new Date();
    return getPercentage(startOfYear(now), startOfYear(addYears(now, 1)), now);
  }

  initialiseProgressBar(getYearPercentage, 6);
};
