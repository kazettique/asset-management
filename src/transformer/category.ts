import { DEFAULT_NAME } from '@/constant';
import { MCategory, VCategory } from '@/types';
import { DCategory } from '@/types/dbModels';
import { NameValidator } from '@/validator';

export abstract class CategoryTransformer {
  public static DCategoryTransformer(src: DCategory): MCategory {
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

  public static MCategoryTransformer(src: MCategory): VCategory {
    return src;
  }
}
