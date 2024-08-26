import { DEFAULT_NAME } from '@/constant';
import { DBrand, MBrand, VBrand } from '@/types';
import { NameValidator } from '@/validator';

export abstract class BrandTransformer {
  public static DBrandTransformer(src: DBrand): MBrand {
    const nameValidation = NameValidator.safeParse(src.name);

    if (!nameValidation.success) {
      return { comment: src.comment, id: src.id, name: DEFAULT_NAME };
    } else {
      return {
        comment: src.comment,
        id: src.id,
        name: { ...DEFAULT_NAME, ...nameValidation.data },
      };
    }
  }

  public static MBrandTransformer(src: MBrand): VBrand {
    return src;
  }
}
