import { DTag, MTag, VTag, VTagTable } from '@/types';

export abstract class TagTransformer {
  public static DMTagTransformer(src: DTag): MTag {
    return src;
  }

  public static MVTagTransformer(src: MTag): VTag {
    return src;
  }

  public static VTTagTransformer(src: VTag): VTagTable {
    return {
      comment: src.comment ?? '',
      name: src.name,
      raw: src,
    };
  }
}
