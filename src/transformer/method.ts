import { DMethod, MMethod, VMethod } from '@/types';

export abstract class MethodTransformer {
  public static DMMethodTransformer(src: DMethod): MMethod {
    return src;
  }

  public static MVMethodTransformer(src: MMethod): VMethod {
    return src;
  }
}
