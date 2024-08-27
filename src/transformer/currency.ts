import { DCurrency, MCurrency, VCurrency } from '@/types';

export abstract class CurrencyTransformer {
  public static DCurrencyTransformer(src: DCurrency): MCurrency {
    return src;
  }

  public static MCurrencyTransformer(src: MCurrency): VCurrency {
    return src;
  }
}
