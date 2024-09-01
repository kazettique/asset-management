import { MPlatform, VPlatform, VPlatformTable } from '@/types';
import { DPlatform } from '@/types/dbModels';

export abstract class PlatformTransformer {
  public static DMPlatformTransformer(src: DPlatform): MPlatform {
    return src;
  }

  public static MVPlatformTransformer(src: MPlatform): VPlatform {
    return src;
  }

  public static VTPlatformTransformer(src: VPlatform): VPlatformTable {
    return {
      comment: src.comment ?? '',
      name: src.name,
      raw: src,
    };
  }
}
