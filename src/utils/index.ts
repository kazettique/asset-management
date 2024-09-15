import dayjs, { Dayjs } from 'dayjs';
import { z } from 'zod';

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

  /**
   * @description Check whether is number string
   */
  public static IsNumString(str: string) {
    return !isNaN(Number(str));
  }

  /**
   * @description Nested parse json string
   * @see https://github.com/sibu-github/deep-parse-json
   */
  public static DeepParseJson(jsonString: string | any[] | Record<string, any>): string | any[] | Record<string, any> {
    // if not stringify json rather a simple string value then JSON.parse will throw error
    // otherwise continue recursion
    if (typeof jsonString === 'string') {
      if (this.IsNumString(jsonString)) {
        // if a numeric string is received, return itself
        // otherwise JSON.parse will convert it to a number
        return jsonString;
      }
      try {
        return this.DeepParseJson(JSON.parse(jsonString));
      } catch (err) {
        return jsonString;
      }
    } else if (Array.isArray(jsonString)) {
      // if an array is received, map over the array and deepParse each value
      return jsonString.map((val) => this.DeepParseJson(val));
    } else if (typeof jsonString === 'object' && jsonString !== null) {
      // if an object is received then deepParse each element in the object
      // typeof null returns 'object' too, so we have to eliminate that
      return Object.keys(jsonString).reduce(
        (obj, key) => {
          const val = jsonString[key];
          obj[key] = this.IsNumString(val) ? val : this.DeepParseJson(val);
          return obj;
        },
        {} as Record<string, any>,
      );
    } else {
      // otherwise return whatever was received
      return jsonString;
    }
  }

  public static async WaitTimer(time: number): Promise<void> {
    const timeValidation = z.number().int().nonnegative().safeParse(time);

    if (!timeValidation.success) {
      throw Error(timeValidation.error.message);
    } else {
      return await new Promise<void>((resolve, _reject) => setTimeout(() => resolve(), timeValidation.data));
    }
  }

  public static CalculateSkipCount(page: number, pageSize: number): number {
    return (page - 1) * pageSize;
  }

  public static CalculateTotalPage(totalCount: number, pageSize: number): number {
    return Math.ceil(totalCount / pageSize);
  }

  // ref: https://stackoverflow.com/questions/8495687/split-array-into-chunks
  public static SplitArrayIntoChunks<T>(src: T[], perChunk: number = 1): T[][] {
    return src.reduce<T[][]>((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / perChunk);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);
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
