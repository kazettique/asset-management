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
  endPlatformId: Id;
  endPrice: Price;
  isCensored: boolean;
  meta: AssetMeta;
  name: Name;
  newTags: string[];
  ownerId: Id;
  placeId: Id;
  startCurrencyId: Id;
  startDate: Date;
  startMethodId: Id;
  startPlatformId: Id;
  startPrice: Price;
  tags: Id[];
}
