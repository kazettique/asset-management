import { DEFAULT_NAME } from '@/constant';
import { DBCreateCategory, MCategory, RCreateCategory, VCategory } from '@/type';

export abstract class CategoryTransformer {
  public static categoryTransformer(raw: MCategory): VCategory {
    const rawName = JSON.parse(JSON.stringify(raw.name));

    const modifiedName: VCategory['name'] = {
      ...DEFAULT_NAME,
      ...rawName,
    };

    return {
      ...raw,
      name: modifiedName,
    };
  }

  public static createCategoryTransformer(raw: RCreateCategory): DBCreateCategory {
    const modifiedName: DBCreateCategory['name'] = {
      nameEn: raw.nameEn,
      nameJp: raw.nameJp,
      nameTw: raw.nameTw,
    };

    return { comment: raw.comment, name: modifiedName };
  }
}
