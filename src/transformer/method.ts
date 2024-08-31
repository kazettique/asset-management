import { CommonConstant } from '@/constant';
import { DMethod, MMethod, VMethod } from '@/types';
import { CommonValidator } from '@/validator';

export abstract class MethodTransformer {
  public static DMMethodTransformer(src: DMethod): MMethod {
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

  public static MVMethodTransformer(src: MMethod): VMethod {
    return src;
  }
}
