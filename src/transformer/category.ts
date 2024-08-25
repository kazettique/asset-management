import { DEFAULT_NAME } from '@/constant';
import { DBCreateCategory, MCategory, RCreateCategory, RUpdateCategory, VCategory } from '@/types';
import { NameValidator } from '@/validator';

export abstract class CategoryTransformer {
  public static categoryTransformer(raw: MCategory): VCategory {
    const rawName = JSON.parse(JSON.stringify(raw.name));

    const nameValidation = NameValidator.safeParse(rawName);

    if (!nameValidation.success) {
      return { comment: raw.comment, id: raw.id, ...DEFAULT_NAME };
    } else {
      return {
        comment: raw.comment,
        id: raw.id,
        ...nameValidation.data,
      };
    }
  }

  public static createCategoryTransformer(raw: RCreateCategory): DBCreateCategory {
    const modifiedName: DBCreateCategory['name'] = {
      nameEn: raw.nameEn,
      nameJp: raw.nameJp,
      nameTw: raw.nameTw,
    };

    return { comment: raw.comment, name: modifiedName };
  }

  // todo: duplicate with createCategoryTransformer, need refactor
  public static updateCategoryTransformer(raw: RUpdateCategory): MCategory {
    const modifiedName: DBCreateCategory['name'] = {
      nameEn: raw.nameEn,
      nameJp: raw.nameJp,
      nameTw: raw.nameTw,
    };

    return { comment: raw.comment, id: raw.id, name: modifiedName };
  }
}
