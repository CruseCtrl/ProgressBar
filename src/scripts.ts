import { Options, ProgressBar } from "./progressBar";
import { startOfYear, addYears, startOfMonth, addMonths, startOfDay, addDays, startOfHour, addHours, startOfMinute, addMinutes } from "date-fns";
import * as queryString from "query-string";

type QueryOptions = {
  mode: 'year' | 'month' | 'day' | 'hour' | 'minute'
}

const getOptions = (): Options => {
  const queryOptions = queryString.parse(window.location.search) as QueryOptions;

  switch(queryOptions.mode) {
    case 'month':
      return {
        getIntervalStartTime: startOfMonth,
        getIntervalEndTime: now => startOfMonth(addMonths(now, 1)),
        decimalPlaces: 5,
        name: 'This month',
      };
    case 'day':
      return {
        getIntervalStartTime: startOfDay,
        getIntervalEndTime: now => startOfDay(addDays(now, 1)),
        decimalPlaces: 3,
        name: 'Today',
      };
    case 'hour':
      return {
        getIntervalStartTime: startOfHour,
        getIntervalEndTime: now => startOfHour(addHours(now, 1)),
        decimalPlaces: 2,
        name: 'Current hour',
      };
    case 'minute':
      return {
        getIntervalStartTime: startOfMinute,
        getIntervalEndTime: now => startOfMinute(addMinutes(now, 1)),
        decimalPlaces: 0,
        name: 'Current minute',
      };

    default:
      return {
        getIntervalStartTime: startOfYear,
        getIntervalEndTime: now => startOfYear(addYears(now, 1)),
        decimalPlaces: 6,
        name: 'This year',
      };
  }
}

window.onload = () => {
  const options = getOptions();
  const elementsToUpdate = Array.from(document.getElementsByClassName('progress-value'));
  const bar = document.getElementById('progress-bar');
  
  new ProgressBar(options, elementsToUpdate, bar);
  
  document.title += ` - ${options.name}`;
  const nameElement = document.getElementById('name');
  if (nameElement) {
    nameElement.innerHTML = options.name;
  }
};
