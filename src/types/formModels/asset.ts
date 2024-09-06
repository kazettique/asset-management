import { NType } from '../base';
import { AssetMeta, Name, Price } from '../common';
import { FormOption } from './common';

// no null type in all properties
export interface FAsset {
  brandId: NType<FormOption>;
  categoryId: FormOption;
  comment: string;
  endCurrencyId: NType<FormOption>;
  endDate: NType<Date>;
  endMethodId: NType<FormOption>;
  endPlatformId: NType<FormOption>;
  endPrice: Price;
  isCensored: boolean;
  meta: NType<AssetMeta>;
  name: Name;
  ownerId: NType<FormOption>;
  placeId: NType<FormOption>;
  startCurrencyId: NType<FormOption>;
  startDate: NType<Date>;
  startMethodId: NType<FormOption>;
  startPlatformId: NType<FormOption>;
  startPrice: Price;
  tags: FormOption[];
}

export interface FAssetImport {
  brandId: NType<FormOption>;
  categoryId: FormOption;
  endCurrencyId: NType<FormOption>;
  endMethodId: NType<FormOption>;
  endPlatformId: NType<FormOption>;
  isCensored: boolean;
  meta: NType<AssetMeta>;
  ownerId: NType<FormOption>;
  placeId: NType<FormOption>;
  startCurrencyId: NType<FormOption>;
  startMethodId: NType<FormOption>;
  startPlatformId: NType<FormOption>;
  tags: FormOption[];
}
