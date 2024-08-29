import { Constants } from '@/constant';
import { DCategory, MCategory, VCategory } from '@/types';
import { CategoryValidator } from '@/validator';

export abstract class CategoryTransformer {
  public static DCategoryTransformer(src: DCategory): MCategory {
    const validation = CategoryValidator.DCategoryValidator.safeParse(src.name);

    if (!validation.success) {
      return { ...src, name: Constants.DEFAULT_NAME };
    } else {
      return {
        ...validation.data,
        name:
          typeof validation.data.name === 'object' &&
          validation.data.name !== null &&
          !Array.isArray(validation.data.name)
            ? { ...Constants.DEFAULT_NAME, ...validation.data.name }
            : Constants.DEFAULT_NAME,
      };
    }
  }

  public static MCategoryTransformer(src: MCategory): VCategory {
    return src;
  }
}
