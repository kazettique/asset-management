import { DQuote, FQuote, MQuote, PQuoteFind, VQuote, VQuoteTable } from '@/types';

export abstract class QuoteTransformer {
  public static DMQuoteTransformer(src: DQuote): MQuote {
    return src;
  }

  public static MVQuoteTransformer(src: MQuote): VQuote {
    return src;
  }

  public static VTQuoteTransformer(src: VQuote): VQuoteTable {
    return {
      ...src,
      raw: src,
    };
  }

  public static VFQuoteTransformer(src: VQuote): FQuote {
    return {
      author: src.author,
      quote: src.quote,
    };
  }
}
