import { FormOption, GeneralResponse } from '@/types';

export abstract class CommonTransformer {
  public static ResponseTransformer<T>(data: T): GeneralResponse<T> {
    return { data };
  }

  public static ConvertFormOptionToId(_src: FormOption): string {
    return _src.value;
  }
}
