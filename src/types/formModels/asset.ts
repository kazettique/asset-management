import { NType } from '../base';
import { AssetMeta, Id, Name, Price } from '../common';

// no null type in all properties
export interface FAsset {
  brandId: Id;
  categoryId: Id;
  comment: string;
  endCurrencyId: Id;
  endDate: NType<Date>;
  endMethodId: Id;
  endPlaceId: Id;
  endPrice: Price;
  isCensored: boolean;
  meta: AssetMeta;
  name: Name;
  startCurrencyId: Id;
  startDate: Date;
  startMethodId: Id;
  startPlaceId: Id;
  startPrice: Price;
}
