import dayjs from 'dayjs';

import { FAsset, FAssetImport } from '@/types';

import { CommonConstant } from './common';

export abstract class AssetConstant {
  public static readonly F_ASSET_INITIAL_VALUES: FAsset = {
    brandId: null,
    categoryId: CommonConstant.DEFAULT_SELECT_OPTION,
    comment: '',
    endCurrencyId: null,
    endDate: null,
    endMethodId: null,
    endPlatformId: null,
    endPrice: 0,
    isCensored: false,
    meta: [],
    name: CommonConstant.DEFAULT_NAME,
    ownerId: null,
    placeId: null,
    startCurrencyId: CommonConstant.DEFAULT_SELECT_OPTION,
    startDate: dayjs().toDate(),
    startMethodId: CommonConstant.DEFAULT_SELECT_OPTION,
    startPlatformId: CommonConstant.DEFAULT_SELECT_OPTION,
    startPrice: 0,
    tags: [],
  };

  public static readonly F_ASSET_IMPORT_INITIAL_VALUES: FAssetImport = {
    brandId: null,
    categoryId: CommonConstant.DEFAULT_SELECT_OPTION,
    endCurrencyId: null,
    endMethodId: null,
    endPlatformId: null,
    isCensored: false,
    isLegalFileData: null,
    meta: [],
    ownerId: null,
    placeId: null,
    startCurrencyId: null,
    startMethodId: null,
    startPlatformId: null,
    tags: [],
  };
}
