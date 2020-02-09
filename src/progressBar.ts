import {truncateToDecimalPlaces, getPercentage, getNumberOfDecimalPlaces} from "./helpers";

export type Options = {
  getStartTime: (now: Date) => Date,
  getEndTime: (now: Date) => Date,
  decimalPlaces?: number,
  getRolloverTime?: (now: Date) => Date,
  name: string,
}

export class ProgressBar {
  private options: Options;
  private elementsToUpdate: Element[];
  private bar: HTMLElement;
  private startTime!: Date;
  private endTime!: Date;
  private decimalPlaces!: number;
  private intervalId: number | null = null;
  private timeoutId: number | null = null;

  constructor(options: Options, elementsToUpdate: Element[], bar: HTMLElement) {
    this.options = options;
    this.elementsToUpdate = elementsToUpdate;
    this.bar = bar;

    this.updateBounds();
    document.addEventListener("visibilitychange", this.visibilityCharge);
  }

  private updateBounds = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    const now = new Date();
    this.startTime = this.options.getStartTime(now);
    this.endTime = this.options.getEndTime(now);

    if (now < this.startTime) {
      // The progress bar hasn't started yet
      this.setDisplayedText(`${this.options.name} not yet started`);
      this.timeoutId = setTimeout(this.updateBounds, this.startTime.getTime() - now.getTime());

    } else if (now >= this.endTime && this.options.getRolloverTime) {
      // The progress bar has already finished
      const rollover = this.options.getRolloverTime(now);
      this.bar.style.transitionDuration = '0ms';
      this.bar.style.width = '100%';
      this.setDisplayedText(`${this.options.name} has finished`);
      this.timeoutId = setTimeout(this.updateBounds, rollover.getTime() - now.getTime());

    } else {
      // The progress bar is actually in progress, so we can update it as usual
      const totalMilliseconds = this.endTime.getTime() - this.startTime.getTime();
      this.decimalPlaces = this.options.decimalPlaces == null
          ? getNumberOfDecimalPlaces(totalMilliseconds)
          : this.options.decimalPlaces;
  
      const totalUpdates = 100 * (10 ** this.decimalPlaces);
      const millisecondsPerUpdate = totalMilliseconds / totalUpdates;
  
      const percentage = getPercentage(this.startTime, this.endTime, now);
      this.setDisplayedPercentage(percentage);
  
      const millisecondsUntilEndTime = this.endTime.getTime() - now.getTime();
  
      this.startIntervalAtNextTick(millisecondsPerUpdate, millisecondsUntilEndTime);
  
      this.animateBar(percentage, millisecondsUntilEndTime);
      this.timeoutId = setTimeout(this.updateBounds, millisecondsUntilEndTime);
    }
  };

  private startIntervalAtNextTick = (millisecondsPerUpdate: number, millisecondsUntilEndTime: number) => {
    setTimeout(() => {
      if (this.intervalId == null) { // Don't do anything if there's already another interval running
        this.intervalId = setInterval(this.updateDisplayedPercentage, millisecondsPerUpdate);
        this.updateDisplayedPercentage();
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
      if (this.startTime <= now && now <= this.endTime) {
        const millisecondsUntilEndTime = this.endTime.getTime() - now.getTime();
        this.animateBar(percentage, millisecondsUntilEndTime);
      }
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

  private updateDisplayedPercentage = () =>
    this.setDisplayedPercentage(getPercentage(this.startTime, this.endTime, new Date()));

  private setDisplayedPercentage = (percentage: number) =>
    this.setDisplayedText(truncateToDecimalPlaces(percentage, this.decimalPlaces) + '%');

  private setDisplayedText = (text: string) => {
    this.elementsToUpdate.forEach(element => {
      element.innerHTML = text;
    });
  };
}
