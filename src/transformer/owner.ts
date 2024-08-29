import { CommonConstant } from '@/constant';
import { MOwner, VOwner } from '@/types';
import { DOwner } from '@/types/dbModels';
import { CommonValidator } from '@/validator';

export abstract class OwnerTransformer {
  public static DOwnerTransformer(src: DOwner): MOwner {
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

  public static MOwnerTransformer(src: MOwner): VOwner {
    return src;
  }
}
