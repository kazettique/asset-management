import { GeneralResponse } from '@/types';

export abstract class CommonTransformer {
  public static ResponseTransformer<T>(data: T): GeneralResponse<T> {
    return { data };
  }
}
