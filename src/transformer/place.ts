import { DEFAULT_NAME } from '@/constant';
import { MPlace, VPlace } from '@/types';
import { DPlace } from '@/types/dbModels';
import { NameValidator } from '@/validator';

export abstract class PlaceTransformer {
  public static DPlaceTransformer(src: DPlace): MPlace {
    const nameValidation = NameValidator.safeParse(src.name);

    if (!nameValidation.success) {
      return { ...src, name: DEFAULT_NAME };
    } else {
      return {
        ...src,
        name: { ...DEFAULT_NAME, ...nameValidation.data },
      };
    }
  }

  public static MPlaceTransformer(src: MPlace): VPlace {
    return src;
  }
}
