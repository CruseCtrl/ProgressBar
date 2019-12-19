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
  private intervalId?: number;

  constructor(options: Options, elementsToUpdate: Element[], bar: HTMLElement) {
    this.options = options;
    this.elementsToUpdate = elementsToUpdate;
    this.bar = bar;

    this.updateBounds();
  }

  private updateBounds = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    const now = new Date();
    this.startTime = this.options.getStartTime(now);
    this.endTime = this.options.getEndTime(now);

    const totalMilliseconds = this.endTime.getTime() - this.startTime.getTime();
    const totalUpdates = 100 * (10 ** this.options.decimalPlaces);

    const timePerUpdate = totalMilliseconds / totalUpdates;

    const percentage = getPercentage(this.startTime, this.endTime, now);
    this.setDisplayedValue(percentage);

    const millisecondsUntilEndTime = this.endTime.getTime() - now.getTime();

    this.intervalId = setInterval(this.updateDisplayedValue, timePerUpdate);

    this.animateBar(percentage, millisecondsUntilEndTime);
    setTimeout(this.updateBounds, millisecondsUntilEndTime);
  }

  private updateDisplayedValue = () =>
    this.setDisplayedValue(getPercentage(this.startTime, this.endTime, new Date()))

  private setDisplayedValue = (percentage: number) => {
    const textToShow = truncateToDecimalPlaces(percentage, this.options.decimalPlaces) + '%';

    this.elementsToUpdate.forEach(element => {
      element.innerHTML = textToShow;
    });
  }

  private animateBar = (percentage: number, millisecondsUntilEndTime: number) => {
    this.bar.style.transitionDuration = '0ms';
    window.requestAnimationFrame(() => {
      this.bar.style.width = percentage + '%';
      window.requestAnimationFrame(() => {
        this.bar.style.transitionDuration = `${millisecondsUntilEndTime}ms`;
        this.bar.style.width = '100%';
      });
    });
  }
}
