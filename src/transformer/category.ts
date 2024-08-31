import { DCategory, MCategory, VCategory } from '@/types';

export abstract class CategoryTransformer {
  public static DMCategoryTransformer(src: DCategory): MCategory {
    return src;
  }

  public static MVCategoryTransformer(src: MCategory): VCategory {
    return src;
  }
}
