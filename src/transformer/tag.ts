import { DTag, MTag, VTag } from '@/types';

export abstract class TagTransformer {
  public static DMTagTransformer(src: DTag): MTag {
    return src;
  }

  public static MVTagTransformer(src: MTag): VTag {
    return src;
  }
}
