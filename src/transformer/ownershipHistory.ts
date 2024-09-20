import { DOwnershipHistory, MOwnershipHistory, VOwnershipHistory } from '@/types';

export abstract class OwnershipHistoryTransformer {
  public static DMOwnershipHistoryTransformer(src: DOwnershipHistory): MOwnershipHistory {
    return src;
  }

  public static MVOwnershipHistoryTransformer(src: MOwnershipHistory): VOwnershipHistory {
    return src;
  }
}
