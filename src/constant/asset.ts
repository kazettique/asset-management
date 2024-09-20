import dayjs from 'dayjs';

import {
  AssetLifeStatus,
  FAsset,
  FAssetFindPrimaryFilter,
  FAssetFindSecondaryFilter,
  FAssetImport,
  PAssetFind,
} from '@/types';

import { BrandConstant } from './brand';
import { CategoryConstant } from './category';
import { CommonConstant } from './common';
import { OwnerConstant } from './owner';
import { PlaceConstant } from './place';

export abstract class AssetConstant {
  public static readonly F_ASSET_INITIAL_VALUES: FAsset = {
    brandId: BrandConstant.DEFAULT_BRAND_OPTION,
    categoryId: CategoryConstant.DEFAULT_CATEGORY_OPTION,
    comment: '',
    endCurrency: null,
    endDate: null,
    endMethodId: null,
    endPlatformId: null,
    endPrice: '',
    isCensored: false,
    meta: [],
    name: CommonConstant.DEFAULT_NAME,
    ownerId: OwnerConstant.DEFAULT_OWNER_OPTION,
    placeId: PlaceConstant.DEFAULT_PLACE_OPTION,
    startCurrency: null,
    startDate: dayjs().toDate(),
    startMethodId: null,
    startPlatformId: null,
    startPrice: '',
    tags: [],
  };

  public static readonly F_ASSET_IMPORT_INITIAL_VALUES: FAssetImport = {
    brandId: BrandConstant.DEFAULT_BRAND_OPTION,
    categoryId: CategoryConstant.DEFAULT_CATEGORY_OPTION,
    endCurrency: null,
    endMethodId: null,
    endPlatformId: null,
    isCensored: false,
    isLegalFileData: null,
    meta: [],
    ownerId: OwnerConstant.DEFAULT_OWNER_OPTION,
    placeId: PlaceConstant.DEFAULT_PLACE_OPTION,
    startCurrency: null,
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

  public static readonly F_ASSET_FIND_SECONDARY_FILTER_INITIAL_VALUES: FAssetFindSecondaryFilter = {
    brands: [],
    endDateRange: ['', ''],
    endMethods: [],
    endPlatforms: [],
    endPriceRange: ['', ''],
    places: [],
    startDateRange: ['', ''],
    startMethods: [],
    startPlatforms: [],
    startPriceRange: ['', ''],
  };
}
