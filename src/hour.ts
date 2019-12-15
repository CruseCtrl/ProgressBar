import { startOfHour, addHours } from 'date-fns';
import { initialiseProgressBar, getPercentage } from './scripts';

window.onload = () => {
  const getHourPercentage = () => {
    const now = new Date();
    return getPercentage(startOfHour(now), startOfHour(addHours(now, 1)), now);
  }

  initialiseProgressBar(getHourPercentage, 2);
};
