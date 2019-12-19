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
  private bar: HTMLElement | null;
  private startTime!: Date;
  private endTime!: Date;
  private intervalId?: number;

  constructor(options: Options, elementsToUpdate: Element[], bar: HTMLElement | null) {
    this.options = options;
    this.elementsToUpdate = elementsToUpdate;
    this.bar = bar;

    this.updateInterval();

    this.updatePage();
  }

  private updateInterval = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    const now = new Date();
    this.startTime = this.options.getStartTime(now);
    this.endTime = this.options.getEndTime(now);

    const totalMilliseconds = this.endTime.getTime() - this.startTime.getTime();
    const totalUpdates = 100 * (10 ** this.options.decimalPlaces);

    const timePerUpdate = totalMilliseconds / totalUpdates;

    this.intervalId = setInterval(this.updatePage, timePerUpdate);
  }

  private updatePage = () => {
    const now = new Date();
    if (now >= this.endTime) {
      this.updateInterval();
    }
    const percentage = getPercentage(this.startTime, this.endTime, now);
    const textToShow = truncateToDecimalPlaces(percentage, this.options.decimalPlaces) + '%';
    
    this.elementsToUpdate.forEach(element => {
      element.innerHTML = textToShow;
    });
    if (this.bar) {
      this.bar.style.width = percentage + '%';
    }
  }
}
