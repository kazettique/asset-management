import { DCurrency, MCurrency, VCurrency } from '@/types';

export abstract class CurrencyTransformer {
  public static DMCurrencyTransformer(src: DCurrency): MCurrency {
    return src;
  }

  public static MVCurrencyTransformer(src: MCurrency): VCurrency {
    return src;
  }
}
