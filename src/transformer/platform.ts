import { MPlatform, VPlatform } from '@/types';
import { DPlatform } from '@/types/dbModels';

export abstract class PlatformTransformer {
  public static DMPlatformTransformer(src: DPlatform): MPlatform {
    return src;
  }

  public static MVPlatformTransformer(src: MPlatform): VPlatform {
    return src;
  }
}
