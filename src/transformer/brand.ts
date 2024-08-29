import { CommonConstant } from '@/constant';
import { DBrand, MBrand, VBrand } from '@/types';
import { CommonValidator } from '@/validator';

export abstract class BrandTransformer {
  public static DBrandTransformer(src: DBrand): MBrand {
    const nameValidation = CommonValidator.NameValidator.safeParse(src.name);

    if (!nameValidation.success) {
      return { ...src, name: CommonConstant.DEFAULT_NAME };
    } else {
      return {
        ...src,
        name: { ...CommonConstant.DEFAULT_NAME, ...nameValidation.data },
      };
    }
  }

  public static MBrandTransformer(src: MBrand): VBrand {
    return src;
  }
}
