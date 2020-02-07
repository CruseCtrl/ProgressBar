import { truncateToDecimalPlaces, getPercentage } from "./helpers";

export type Options = {
  getStartTime: (now: Date) => Date,
  getEndTime: (now: Date) => Date,
  decimalPlaces: number,
  name: string,
}

export class ProgressBar {
  private options: Options;
  private elementsToUpdate: Element[];
  private bar: HTMLElement;
  private startTime!: Date;
  private endTime!: Date;
  private intervalId: number | null = null;

  constructor(options: Options, elementsToUpdate: Element[], bar: HTMLElement) {
    this.options = options;
    this.elementsToUpdate = elementsToUpdate;
    this.bar = bar;

    this.updateBounds();
  }

  private updateBounds = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    const now = new Date();
    this.startTime = this.options.getStartTime(now);
    this.endTime = this.options.getEndTime(now);

    const totalMilliseconds = this.endTime.getTime() - this.startTime.getTime();
    const totalUpdates = 100 * (10 ** this.options.decimalPlaces);

    const millisecondsPerUpdate = totalMilliseconds / totalUpdates;

    const percentage = getPercentage(this.startTime, this.endTime, now);
    this.setDisplayedValue(percentage);

    const millisecondsUntilEndTime = this.endTime.getTime() - now.getTime();

    this.startIntervalAtNextTick(millisecondsPerUpdate, millisecondsUntilEndTime);

    this.animateBar(percentage, millisecondsUntilEndTime);
    setTimeout(this.updateBounds, millisecondsUntilEndTime);
    document.addEventListener("visibilitychange", this.visibilityCharge);
  };

  private startIntervalAtNextTick = (millisecondsPerUpdate: number, millisecondsUntilEndTime: number) => {
    setTimeout(() => {
      if (this.intervalId == null) { // Don't do anything if there's already another interval running
        this.intervalId = setInterval(this.updateDisplayedValue, millisecondsPerUpdate);
        this.updateDisplayedValue();
      }
    },
    millisecondsUntilEndTime % millisecondsPerUpdate);
  };

  // Some browsers (Chrome & Firefox) disable css animations when the tab is in the background,
  // so we need to reset the bar when the tab is visible again
  private visibilityCharge = () => {
    if (document.visibilityState === 'visible') {
      const now = new Date();
      const percentage = getPercentage(this.startTime, this.endTime, now);
      const millisecondsUntilEndTime = this.endTime.getTime() - now.getTime();
      this.animateBar(percentage, millisecondsUntilEndTime);
    }
  };

  private animateBar = (percentage: number, millisecondsUntilEndTime: number) => {
    this.bar.style.transitionDuration = '0ms';
    window.requestAnimationFrame(() => {
      this.bar.style.width = percentage + '%';
      window.requestAnimationFrame(() => {
        this.bar.style.transitionDuration = `${millisecondsUntilEndTime}ms`;
        this.bar.style.width = '100%';
      });
    });
  };

  private updateDisplayedValue = () =>
    this.setDisplayedValue(getPercentage(this.startTime, this.endTime, new Date()));

  private setDisplayedValue = (percentage: number) => {
    const textToShow = truncateToDecimalPlaces(percentage, this.options.decimalPlaces) + '%';

    this.elementsToUpdate.forEach(element => {
      element.innerHTML = textToShow;
    });
  }
}
