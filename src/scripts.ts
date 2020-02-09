import { Options, ProgressBar } from "./progressBar";
import {
  startOfYear,
  addYears,
  startOfMonth,
  addMonths,
  startOfDay,
  addDays,
  startOfHour,
  addHours,
  startOfMinute,
  addMinutes,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds
} from "date-fns";
import * as queryString from "query-string";

type QueryOptions = {
  mode: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'work-day'
}

const resetSeconds = (date: Date) => setSeconds(setMilliseconds(date, 0), 0);
const resetMinutes = (date: Date) => setMinutes(resetSeconds(date), 0);

const getOptions = (): Options => {
  const queryOptions = queryString.parse(window.location.search) as QueryOptions;

  switch(queryOptions.mode) {
    case 'month':
      return {
        getStartTime: startOfMonth,
        getEndTime: now => startOfMonth(addMonths(now, 1)),
        name: 'This month',
      };
    case 'day':
      return {
        getStartTime: startOfDay,
        getEndTime: now => startOfDay(addDays(now, 1)),
        name: 'Today',
      };
    case 'hour':
      return {
        getStartTime: startOfHour,
        getEndTime: now => startOfHour(addHours(now, 1)),
        name: 'Current hour',
      };
    case 'minute':
      return {
        getStartTime: startOfMinute,
        getEndTime: now => startOfMinute(addMinutes(now, 1)),
        name: 'Current minute',
      };
    case 'work-day':
      return {
        getStartTime: now => setHours(resetMinutes(now), 9),
        getEndTime: now => setHours(setMinutes(resetSeconds(now), 30), 17),
        getRolloverTime: now => startOfDay(addDays(now, 1)),
        name: 'Work day (9am - 5:30pm)',
      };

    default:
      return {
        getStartTime: startOfYear,
        getEndTime: now => startOfYear(addYears(now, 1)),
        name: 'This year',
      };
  }
};

window.onload = () => {
  const options = getOptions();
  const elementsToUpdate = Array.from(document.getElementsByClassName('progress-value'));
  const bar = document.getElementById('progress-bar');

  if (!bar) {
    throw new Error('Can\'t find element with id "progress-bar"');
  }

  new ProgressBar(options, elementsToUpdate, bar);
  
  document.title += ` - ${options.name}`;
  const nameElement = document.getElementById('name');
  if (nameElement) {
    nameElement.innerHTML = options.name;
  }
};
