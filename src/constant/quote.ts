import { FQuote } from '@/types';

export abstract class QuoteConstant {
  public static readonly F_QUOTE_INITIAL_VALUES: FQuote = {
    author: '',
    quote: '',
  };
}
