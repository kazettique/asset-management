import { DMethod, FMethod, MMethod, VMethod, VMethodTable } from '@/types';

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

  public static VFMethodTransformer(src: VMethod): FMethod {
    return {
      comment: src.comment,
      name: src.name,
      type: src.type,
    };
  }
}
