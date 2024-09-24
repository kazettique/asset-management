import { DBrand, FBrand, MBrand, PBrandFind, VBrand, VBrandTable } from '@/types';

export abstract class BrandTransformer {
  public static DMBrandTransformer(src: DBrand): MBrand {
    return src;
  }

  public static MVBrandTransformer(src: MBrand): VBrand {
    return src;
  }

  public static VTBrandTransformer(src: VBrand): VBrandTable {
    return {
      comment: src.comment ?? '',
      name: src.name,
      raw: src,
    };
  }

  public static VFBrandTransformer(src: VBrand): FBrand {
    return {
      comment: src.comment,
      name: src.name,
    };
  }

  public static PBrandFindQueryStringTransformer(src: PBrandFind): Record<string, string> {
    return {
      page: String(src.page),
      pageSize: String(src.pageSize),
    };
  }
}
