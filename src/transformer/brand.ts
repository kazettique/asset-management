import { DBrand, MBrand, VBrand, VBrandTable } from '@/types';

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
}
