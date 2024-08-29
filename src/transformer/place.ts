import { CommonConstant } from '@/constant';
import { MPlace, VPlace } from '@/types';
import { DPlace } from '@/types/dbModels';
import { CommonValidator } from '@/validator';

export abstract class PlaceTransformer {
  public static DPlaceTransformer(src: DPlace): MPlace {
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

  public static MPlaceTransformer(src: MPlace): VPlace {
    return src;
  }
}
