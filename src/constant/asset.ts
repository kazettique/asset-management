import dayjs from 'dayjs';

import { AssetLifeStatus, FAsset, FAssetFindPrimaryFilter, FAssetImport, PAssetFind } from '@/types';

import { CommonConstant } from './common';

export abstract class AssetConstant {
  public static readonly F_ASSET_INITIAL_VALUES: FAsset = {
    brandId: null,
    categoryId: null,
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
    startCurrencyId: null,
    startDate: dayjs().toDate(),
    startMethodId: null,
    startPlatformId: null,
    startPrice: 0,
    tags: [],
  };

  public static readonly F_ASSET_IMPORT_INITIAL_VALUES: FAssetImport = {
    brandId: null,
    categoryId: null,
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

  public static readonly P_ASSET_FIND_DEFAULT: PAssetFind = {
    filters: {
      lifeStatus: AssetLifeStatus.ALL,
    },
    page: CommonConstant.DEFAULT_PAGE,
    pageSize: CommonConstant.DEFAULT_PAGE_SIZE,
  };

  public static readonly F_ASSET_FIND_PRIMARY_FILTER_INITIAL_VALUES: FAssetFindPrimaryFilter = {
    categories: [],
    lifeStatus: AssetLifeStatus.ALL,
    owners: [],
  };
}
