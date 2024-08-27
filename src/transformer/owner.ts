import { DEFAULT_NAME } from '@/constant';
import { MOwner, VOwner } from '@/types';
import { DOwner } from '@/types/dbModels';
import { NameValidator } from '@/validator';

export abstract class OwnerTransformer {
  public static DOwnerTransformer(src: DOwner): MOwner {
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

  public static MOwnerTransformer(src: MOwner): VOwner {
    return src;
  }
}
