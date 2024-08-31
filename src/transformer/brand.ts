import { DBrand, MBrand, VBrand } from '@/types';

export abstract class BrandTransformer {
  public static DMBrandTransformer(src: DBrand): MBrand {
    return src;
  }

  public static MVBrandTransformer(src: MBrand): VBrand {
    return src;
  }
}
