import { FormOption, GeneralResponse, PFindPagination } from '@/types';

export abstract class CommonTransformer {
  public static ResponseTransformer<T>(data: T): GeneralResponse<T> {
    return { data };
  }

  public static ConvertFormOptionToId(_src: FormOption): string {
    return _src.value;
  }

  public static PFindPaginationQueryStringTransformer(src: PFindPagination): Record<string, string> {
    return {
      page: String(src.page),
      pageSize: String(src.pageSize),
    };
  }
}
