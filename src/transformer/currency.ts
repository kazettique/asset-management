import { DCurrency, FCurrency, MCurrency, VCurrency, VCurrencyTable } from '@/types';

export abstract class CurrencyTransformer {
  public static DMCurrencyTransformer(src: DCurrency): MCurrency {
    return src;
  }

  public static MVCurrencyTransformer(src: MCurrency): VCurrency {
    return src;
  }

  public static VTCurrencyTransformer(src: VCurrency): VCurrencyTable {
    return {
      comment: src.comment,
      display: src.display,
      name: src.name,
      raw: src,
      symbol: src.symbol,
    };
  }

  public static VFCurrencyTransformer(src: VCurrency): FCurrency {
    return {
      comment: src.comment,
      display: src.display,
      name: src.name,
      symbol: src.symbol,
    };
  }
}
