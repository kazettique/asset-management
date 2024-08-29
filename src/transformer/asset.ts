import dayjs from 'dayjs';

import { CommonConstant } from '@/constant';
import { DAsset, FAsset, MAsset, RAsset, VAsset } from '@/types';
import { AssetValidator } from '@/validator';

export abstract class AssetTransformer {
  // db model -> model
  public static DAssetTransformer(src: DAsset): MAsset {
    const assetValidation = AssetValidator.MAssetValidator.safeParse(src);

    if (!assetValidation.success) {
      return {
        ...src,
        meta: typeof src.meta === 'object' && src.meta !== null && !Array.isArray(src.meta) ? src.meta : {},
        name:
          typeof src.name === 'object' && src.name !== null && !Array.isArray(src.name)
            ? { ...src.name, ...CommonConstant.DEFAULT_NAME }
            : CommonConstant.DEFAULT_NAME,
      };
    } else {
      return assetValidation.data;
    }
  }

  // model -> view model
  public static MAssetTransformer(src: MAsset): VAsset {
    return src;
  }

  // view model -> form model
  public static VAssetTransformer(src: VAsset): FAsset {
    return {
      brandId: src.brandId,
      categoryId: src.categoryId,
      comment: src.comment ?? '',
      endCurrencyId: src.endCurrencyId ?? '',
      endDate: src.endDate,
      endMethodId: src.endMethodId ?? '',
      endPlaceId: src.endPlaceId ?? '',
      endPrice: src.endPrice ?? 0,
      isCensored: src.isCensored,
      meta: src.meta,
      name: src.name,
      startCurrencyId: src.startCurrencyId,
      startDate: src.startDate,
      startMethodId: src.startMethodId,
      startPlaceId: src.startPlaceId,
      startPrice: src.startPrice,
    };
  }

  // form model -> request model
  public static FAssetTransformer(src: FAsset): RAsset {
    return {
      ...src,
      endCurrencyId: src.endCurrencyId.length === 0 ? null : src.endCurrencyId,
      endMethodId: src.endMethodId.length === 0 ? null : src.endMethodId,
      endPlaceId: src.endPlaceId.length === 0 ? null : src.endPlaceId,
      endPrice: src.endPrice,
      startDate: new Date(src.startDate),
    };
  }
}
