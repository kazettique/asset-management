import { DEFAULT_NAME } from '@/constant';
import { DMethod, MMethod, VMethod } from '@/types';
import { CommonValidator } from '@/validator';

export abstract class MethodTransformer {
  public static DMethodTransformer(src: DMethod): MMethod {
    const nameValidation = CommonValidator.NameValidator.safeParse(src.name);

    if (!nameValidation.success) {
      return { ...src, name: DEFAULT_NAME };
    } else {
      return {
        ...src,
        name: { ...DEFAULT_NAME, ...nameValidation.data },
      };
    }
  }

  public static MMethodTransformer(src: MMethod): VMethod {
    return src;
  }
}
