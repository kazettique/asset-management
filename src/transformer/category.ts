import { DCategory, FCategory, MCategory, PCategoryFind, VCategory, VCategoryTable } from '@/types';

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

  public static VFCategoryTransformer(src: VCategory): FCategory {
    return {
      comment: src.comment,
      name: src.name,
    };
  }

  public static PCategoryFindQueryStringTransformer(src: PCategoryFind): Record<string, string> {
    return {
      page: String(src.page),
      pageSize: String(src.pageSize),
    };
  }
}
