import { DEFAULT_NAME } from '@/constant';
import { DAsset, MAsset, MethodType, VAsset } from '@/types';
import { MAssetValidator } from '@/validator';

export abstract class AssetTransformer {
  public static DAssetTransformer(src: DAsset): MAsset {
    const assetValidation = MAssetValidator.safeParse(src);

    if (!assetValidation.success) {
      return {
        ...src,
        brand: { name: { ...src.brand, ...DEFAULT_NAME } },
        endMethod: {
          name:
            src.endMethod?.name && typeof src.endMethod.name === 'object'
              ? { ...src.endMethod.name, ...DEFAULT_NAME }
              : DEFAULT_NAME,
          type: src.endMethod?.name && typeof src.endMethod.name === 'object' ? src.endMethod.type : MethodType.START,
        },
        meta: typeof src.meta === 'object' && src.meta !== null && !Array.isArray(src.meta) ? src.meta : {},
        name: { ...(src.name as object), ...DEFAULT_NAME },
        startMethod: {
          ...src.startMethod,
          name: typeof src.startMethod.name === 'object' ? { ...src.startMethod.name, ...DEFAULT_NAME } : DEFAULT_NAME,
        },
      };
    } else {
      return assetValidation.data;
    }
  }

  public static MAssetTransformer(src: MAsset): VAsset {
    return src;
  }
}
