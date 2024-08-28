import { Constants } from '@/constant';
import { DAsset, MAsset, VAsset } from '@/types';
import { AssetValidator } from '@/validator';

export abstract class AssetTransformer {
  public static DAssetTransformer(src: DAsset): MAsset {
    const assetValidation = AssetValidator.MAssetValidator.safeParse(src);

    if (!assetValidation.success) {
      return {
        ...src,
        meta: typeof src.meta === 'object' && src.meta !== null && !Array.isArray(src.meta) ? src.meta : {},
        name:
          typeof src.name === 'object' && src.name !== null && !Array.isArray(src.name)
            ? { ...src.name, ...Constants.DEFAULT_NAME }
            : Constants.DEFAULT_NAME,
      };
    } else {
      return assetValidation.data;
    }
  }

  public static MAssetTransformer(src: MAsset): VAsset {
    return src;
  }
}
