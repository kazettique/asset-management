import { Name, NString, NType, Price } from '../base';
import { AssetMeta, DbBase } from '../common';
import { DBrand, DCategory, DForex, DMethod, DOwner, DPlace, DPlatform, DTag } from '../dbModels';
import { MForex } from './forex';

export interface MAsset extends DbBase {
  brand: NType<Omit<DBrand, 'comment'>>;
  category: NType<Omit<DCategory, 'comment'>>;
  comment: NString;
  endDate: NType<Date>;
  endForex: NType<Pick<DForex, 'rate' | 'targetCurrency'>>;
  endMethod: NType<Pick<DMethod, 'name' | 'id'>>;
  endPlatform: NType<Omit<DPlatform, 'comment'>>;
  endPrice: NType<Price>;
  isCensored: boolean;
  meta: NType<AssetMeta>;
  name: Name;
  owner: NType<Omit<DOwner, 'comment'>>;
  place: NType<Omit<DPlace, 'comment'>>;
  startDate: NType<Date>;
  startForex: NType<Pick<DForex, 'rate' | 'targetCurrency'>>;
  startMethod: NType<Pick<DMethod, 'name' | 'id'>>;
  startPlatform: NType<Pick<DPlatform, 'name' | 'id'>>;
  startPrice: NType<Price>;
  tags: Omit<DTag, 'comment'>[];
}
