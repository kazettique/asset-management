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
  meta: AssetMeta;
  name: Name;
  ownerId: NType<FormOption>;
  placeId: NType<FormOption>;
  startCurrencyId: FormOption;
  startDate: Date;
  startMethodId: FormOption;
  startPlatformId: FormOption;
  startPrice: Price;
  tags: FormOption[];
}
