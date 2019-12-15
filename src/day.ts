import { startOfDay, addDays } from 'date-fns';
import { initialiseProgressBar, getPercentage } from './scripts';

window.onload = () => {
  const getDayPercentage = () => {
    const now = new Date();
    return getPercentage(startOfDay(now), startOfDay(addDays(now, 1)), now);
  }

  initialiseProgressBar(getDayPercentage, 4);
};
