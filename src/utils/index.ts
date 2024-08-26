import { GeneralResponse } from '@/types';

export abstract class CommonTransformer {
  public static ResponseTransformer<T>(data: T): GeneralResponse<T> {
    return { data };
  }
}

// export function getCircularReplacer() {
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
