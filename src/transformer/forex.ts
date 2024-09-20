import { DForex, MForex, VForex } from '@/types';

export abstract class ForexTransformer {
  public static DMForexTransformer(src: DForex): MForex {
    return src;
  }

  public static MVForexTransformer(src: MForex): VForex {
    return src;
  }
}
