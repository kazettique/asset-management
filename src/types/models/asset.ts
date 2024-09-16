import { Name, NString, NType, Price } from '../base';
import { AssetMeta, DbBase } from '../common';
import { DBrand, DCategory, DMethod, DOwner, DPlace, DPlatform, DTag } from '../dbModels';

export interface MAsset extends DbBase {
  brand: NType<Omit<DBrand, 'comment'>>;
  category: NType<Omit<DCategory, 'comment'>>;
  comment: NString;
  endCurrency: NString;
  endDate: NType<Date>;
  endMethod: NType<Pick<DMethod, 'name' | 'id'>>;
  endPlatform: NType<Omit<DPlatform, 'comment'>>;
  endPrice: NType<Price>;
  isCensored: boolean;
  meta: NType<AssetMeta>;
  name: Name;
  owner: NType<Omit<DOwner, 'comment'>>;
  place: NType<Omit<DPlace, 'comment'>>;
  startCurrency: NString;
  startDate: NType<Date>;
  startMethod: NType<Pick<DMethod, 'name' | 'id'>>;
  startPlatform: NType<Pick<DPlatform, 'name' | 'id'>>;
  startPrice: NType<Price>;
  tags: Omit<DTag, 'comment'>[];
}
