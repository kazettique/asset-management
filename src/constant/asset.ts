import { FAsset } from '@/types';

import { Constants } from './common';

export abstract class AssetConstant {
  public static readonly F_ASSET_INITIAL_VALUES: FAsset = {
    brandId: '',
    categoryId: '',
    comment: null,
    endCurrencyId: null,
    endDate: null,
    endMethodId: null,
    endPlaceId: null,
    endPrice: null,
    isCensored: false,
    meta: {},
    name: Constants.DEFAULT_NAME,
    startCurrencyId: '',
    startDate: new Date(),
    startMethodId: '',
    startPlaceId: '',
    startPrice: 0,
  };
}
