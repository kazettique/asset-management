import { DExchangeRate, MExchangeRate, VExchangeRate } from '@/types';

export abstract class ExchangeRateTransformer {
  public static DMExchangeRateTransformer(src: DExchangeRate): MExchangeRate {
    return src;
  }

  public static MVExchangeRateTransformer(src: MExchangeRate): VExchangeRate {
    return src;
  }
}
