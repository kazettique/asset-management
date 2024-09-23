import { FQuote, FQuoteImport, PQuoteFind } from '@/types';

import { CommonConstant } from './common';

export abstract class QuoteConstant {
  public static readonly F_QUOTE_INITIAL_VALUES: FQuote = {
    author: '',
    quote: '',
  };

  public static readonly F_QUOTE_IMPORT_INITIAL_VALUES: FQuoteImport = {
    isLegalFileData: null,
  };

  public static readonly P_QUOTE_FIND_DEFAULT: PQuoteFind = {
    page: CommonConstant.DEFAULT_PAGE,
    pageSize: CommonConstant.DEFAULT_PAGE_SIZE,
  };
}
