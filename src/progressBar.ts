import { truncateToDecimalPlaces, getPercentage } from "./helpers";

export type Options = {
  getIntervalStartTime: (now: Date) => Date,
  getIntervalEndTime: (now: Date) => Date,
  decimalPlaces: number,
  name: string,
}

export class ProgressBar {
  private options: Options;
  private elementsToUpdate: Element[];
  private bar: HTMLElement | null;
  private intervalStartTime!: Date;
  private intervalEndTime!: Date;

  constructor(options: Options, elementsToUpdate: Element[], bar: HTMLElement | null) {
    this.options = options;
    this.elementsToUpdate = elementsToUpdate;
    this.bar = bar;
    
    this.updateInterval();

    setInterval(this.updatePage, 40); // 25 times per second
    this.updatePage();
  }

  private updateInterval = () => {
    const now = new Date();
    this.intervalStartTime = this.options.getIntervalStartTime(now);
    this.intervalEndTime = this.options.getIntervalEndTime(now);
  }

  private updatePage = () => {
    const now = new Date();
    if (now >= this.intervalEndTime) {
      this.updateInterval();
    }
    const percentage = getPercentage(this.intervalStartTime, this.intervalEndTime, now);
    const textToShow = truncateToDecimalPlaces(percentage, this.options.decimalPlaces) + '%';
    
    this.elementsToUpdate.forEach(element => {
      element.innerHTML = textToShow;
    });
    if (this.bar) {
      this.bar.style.width = percentage + '%';
    }
  }
}
