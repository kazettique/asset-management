import { DTag, FTag, MTag, PTagFind, VTag, VTagTable } from '@/types';

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

  public static VFTagTransformer(src: VTag): FTag {
    return {
      comment: src.comment,
      name: src.name,
    };
  }

  public static PTagFindQueryStringTransformer(src: PTagFind): Record<string, string> {
    return {
      page: String(src.page),
      pageSize: String(src.pageSize),
    };
  }
}
