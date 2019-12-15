import { startOfMinute, addMinutes } from 'date-fns';
import { initialiseProgressBar, getPercentage } from './scripts';

window.onload = () => {
  const getMinutePercentage = () => {
    const now = new Date();
    return getPercentage(startOfMinute(now), startOfMinute(addMinutes(now, 1)), now);
  }

  initialiseProgressBar(getMinutePercentage, 0);
};
