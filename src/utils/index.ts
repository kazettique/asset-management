import dayjs, { Dayjs } from 'dayjs';

import { CommonConstant } from '@/constant';

export abstract class Utils {
  /**
   * @description Check whether is plain JavaScript object
   * @see https://stackoverflow.com/questions/57227185/how-to-detect-if-a-variable-is-a-pure-javascript-object
   */
  public static IsPlainObject<T>(source: T): boolean {
    return source?.constructor.name === 'Object';
  }

  /**
   * Get Date Time String 'YYYY.MM.DD HH:mm'
   * @function getDateTimeString
   * @param {(Dayjs | Date)} dateTime
   * @returns {string}
   */
  public static GetDateTimeString(dateTime: Dayjs | Date | string, format = CommonConstant.DATE_TIME_FORMAT): string {
    return dayjs(dateTime).format(format);
  }

  /**
   * Get Number String with Commas
   * @function numberWithCommas
   * @param {(number | string)} x
   * @returns {string} number string
   */
  public static NumberWithCommas(x: number | string): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // ref: https://stackoverflow.com/questions/68254697/have-the-difference-between-two-date-in-days-and-months-with-dayjs-and-react
  public static DetailedRelativeTime(startDate: Dayjs, endDate: Dayjs): string {
    const duration = dayjs.duration(endDate.diff(startDate));

    const durationInYears = duration.years();
    const durationInMonths = duration.months();
    const durationInDays = duration.days();

    const output: string[] = [];

    if (durationInYears !== 0) output.push(durationInYears + 'y');
    if (durationInMonths !== 0) output.push(durationInMonths + 'm');
    if (durationInDays !== 0) output.push(durationInDays + 'd');

    // There were no durations that need to be added, so just return the default relative date
    return output.join(',');
  }

  // public static GetCircularReplacer() {
  //   const ancestors: any[] = [];

  //   return function (key: string, value: any) {
  //     if (typeof value !== 'object' || value === null) {
  //       return value;
  //     }
  //     // `this` is the object that value is contained in,
  //     // i.e., its direct parent.
  //     while (ancestors.length > 0 && ancestors.at(-1) !== this) {
  //       ancestors.pop();
  //     }
  //     if (ancestors.includes(value)) {
  //       return '[Circular]';
  //     }
  //     ancestors.push(value);
  //     return value;
  //   };
  // }
}
