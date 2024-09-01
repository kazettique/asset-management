import { DCategory, MCategory, VCategory, VCategoryTable } from '@/types';

export abstract class CategoryTransformer {
  public static DMCategoryTransformer(src: DCategory): MCategory {
    return src;
  }

  public static MVCategoryTransformer(src: MCategory): VCategory {
    return src;
  }

  public static VTCategoryTransformer(src: VCategory): VCategoryTable {
    return {
      comment: src.comment ?? '',
      name: src.name,
      raw: src,
    };
  }
}
