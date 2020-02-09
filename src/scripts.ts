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

type Mode = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'work-day';

type QueryOptions = {
  mode?: Mode;
}

const resetSeconds = (date: Date) => setSeconds(setMilliseconds(date, 0), 0);
const resetMinutes = (date: Date) => setMinutes(resetSeconds(date), 0);

const builtInBars: {[mode in Mode]: Options} = {
  'year': {
    getStartTime: startOfYear,
    getEndTime: now => startOfYear(addYears(now, 1)),
    name: 'This year',
  },
  'month': {
    getStartTime: startOfMonth,
    getEndTime: now => startOfMonth(addMonths(now, 1)),
    name: 'This month',
  },
  'day': {
    getStartTime: startOfDay,
    getEndTime: now => startOfDay(addDays(now, 1)),
    name: 'Today',
  },
  'hour': {
    getStartTime: startOfHour,
    getEndTime: now => startOfHour(addHours(now, 1)),
    name: 'Current hour',
  },
  'minute': {
    getStartTime: startOfMinute,
    getEndTime: now => startOfMinute(addMinutes(now, 1)),
    name: 'Current minute',
  },
  'work-day': {
    getStartTime: now => setHours(resetMinutes(now), 9),
    getEndTime: now => setHours(setMinutes(resetSeconds(now), 30), 17),
    getRolloverTime: now => startOfDay(addDays(now, 1)),
    name: 'Work day (9am - 5:30pm)',
  }
};

const getOptions = (): Options => {
  const queryOptions = queryString.parse(window.location.search) as QueryOptions;
  return queryOptions.mode ? builtInBars[queryOptions.mode] : builtInBars['year'];
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

  var navlinks = document.getElementById('navlinks');
  if (navlinks) {
    navlinks.innerHTML = Object.keys(builtInBars).map(mode => `<li><a href="?mode=${mode}">${builtInBars[mode as Mode].name}</a></li>`).join('');
  }
};
