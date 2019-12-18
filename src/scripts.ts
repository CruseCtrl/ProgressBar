import { Options, ProgressBar } from "./progressBar";
import { startOfYear, addYears, startOfMonth, addMonths, startOfDay, addDays, startOfHour, addHours, startOfMinute, addMinutes } from "date-fns";

window.onload = () => {
  const yearOptions: Options = {
    getIntervalStartTime: startOfYear,
    getIntervalEndTime: now => startOfYear(addYears(now, 1)),
    decimalPlaces: 6
  }

  const monthOptions: Options = {
    getIntervalStartTime: startOfMonth,
    getIntervalEndTime: now => startOfMonth(addMonths(now, 1)),
    decimalPlaces: 6
  }

  const dayOptions: Options = {
    getIntervalStartTime: startOfDay,
    getIntervalEndTime: now => startOfDay(addDays(now, 1)),
    decimalPlaces: 6
  }

  const hourOptions: Options = {
    getIntervalStartTime: startOfHour,
    getIntervalEndTime: now => startOfHour(addHours(now, 1)),
    decimalPlaces: 6
  }

  const minuteOptions: Options = {
    getIntervalStartTime: startOfMinute,
    getIntervalEndTime: now => startOfMinute(addMinutes(now, 1)),
    decimalPlaces: 6
  }

  new ProgressBar(yearOptions);
};
