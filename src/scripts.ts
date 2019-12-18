import { Options, ProgressBar } from "./progressBar";
import { startOfYear, addYears, startOfMonth, addMonths, startOfDay, addDays, startOfHour, addHours, startOfMinute, addMinutes } from "date-fns";
import * as queryString from "query-string";

type QueryOptions = {
  mode: 'year' | 'month' | 'day' | 'hour' | 'minute'
}

const yearOptions: Options = {
  getIntervalStartTime: startOfYear,
  getIntervalEndTime: now => startOfYear(addYears(now, 1)),
  decimalPlaces: 6,
}

const monthOptions: Options = {
  getIntervalStartTime: startOfMonth,
  getIntervalEndTime: now => startOfMonth(addMonths(now, 1)),
  decimalPlaces: 5,
}

const dayOptions: Options = {
  getIntervalStartTime: startOfDay,
  getIntervalEndTime: now => startOfDay(addDays(now, 1)),
  decimalPlaces: 3,
}

const hourOptions: Options = {
  getIntervalStartTime: startOfHour,
  getIntervalEndTime: now => startOfHour(addHours(now, 1)),
  decimalPlaces: 2,
}

const minuteOptions: Options = {
  getIntervalStartTime: startOfMinute,
  getIntervalEndTime: now => startOfMinute(addMinutes(now, 1)),
  decimalPlaces: 0,
}

const getOptions = (): Options => {
  const queryOptions = queryString.parse(window.location.search) as QueryOptions;

  switch(queryOptions.mode) {
    case 'year':
      return yearOptions;
    case 'month':
      return monthOptions;
    case 'day':
      return dayOptions;
    case 'hour':
      return hourOptions;
    case 'minute':
      return minuteOptions;

    default:
      return yearOptions;
  }
}

window.onload = () => {
  new ProgressBar(getOptions());
};
