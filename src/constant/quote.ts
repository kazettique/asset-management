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
}
