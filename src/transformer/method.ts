import { DMethod, MMethod, VMethod, VMethodTable } from '@/types';

export abstract class MethodTransformer {
  public static DMMethodTransformer(src: DMethod): MMethod {
    return src;
  }

  public static MVMethodTransformer(src: MMethod): VMethod {
    return src;
  }

  public static VTMethodTransformer(src: VMethod): VMethodTable {
    return {
      comment: src.comment ?? '',
      name: src.name,
      raw: src,
      type: src.type,
    };
  }
}
