import { FOwner, MOwner, VOwner, VOwnerTable } from '@/types';
import { DOwner } from '@/types/dbModels';

export abstract class OwnerTransformer {
  public static DMOwnerTransformer(src: DOwner): MOwner {
    return src;
  }

  public static MVOwnerTransformer(src: MOwner): VOwner {
    return src;
  }

  public static VTOwnerTransformer(src: VOwner): VOwnerTable {
    return {
      comment: src.comment ?? '',
      name: src.name,
      raw: src,
    };
  }

  public static VFOwnerTransformer(src: VOwner): FOwner {
    return {
      comment: src.comment,
      name: src.name,
    };
  }
}
