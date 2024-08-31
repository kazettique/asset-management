import dayjs from 'dayjs';

import { FAsset } from '@/types';

import { CommonConstant } from './common';

export abstract class AssetConstant {
  public static readonly F_ASSET_INITIAL_VALUES: FAsset = {
    brandId: '',
    categoryId: '',
    comment: '',
    endCurrencyId: '',
    endDate: null,
    endMethodId: '',
    endPlatformId: '',
    endPrice: 0,
    isCensored: false,
    meta: [],
    name: CommonConstant.DEFAULT_NAME,
    ownerId: '',
    placeId: '',
    startCurrencyId: '',
    startDate: dayjs().toDate(),
    startMethodId: '',
    startPlatformId: '',
    startPrice: 0,
  };
}
