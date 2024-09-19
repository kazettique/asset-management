import { Prisma } from '@prisma/client';
import { CurrencyCode } from 'currency-codes-ts/dist/types';

import { CurrencyExchangeRate, Name, NString, NType, Price } from '../base';
import { DbBase } from '../common';
import { DBrand } from './brand';
import { DCategory } from './category';
import { DExchangeRate } from './exchangeRate';
import { DMethod } from './method';
import { DOwner } from './owner';
import { DPlace } from './place';
import { DPlatform } from './platform';
import { DTag } from './tag';

export interface DAsset extends DbBase {
  brand: NType<Omit<DBrand, 'comment'>>;
  category: NType<Omit<DCategory, 'comment'>>;
  comment: NString;
  endDate: NType<Date>;
  endExchangeRate: NType<DExchangeRate>;
  endMethod: NType<Pick<DMethod, 'name' | 'id'>>;
  endPlatform: NType<Omit<DPlatform, 'comment'>>;
  endPrice: NType<Price>;
  isCensored: boolean;
  meta: NType<Prisma.JsonValue>;
  name: Name;
  owner: NType<Omit<DOwner, 'comment'>>;
  place: NType<Omit<DPlace, 'comment'>>;
  startDate: NType<Date>;
  startExchangeRate: NType<DExchangeRate>;
  startMethod: NType<Pick<DMethod, 'name' | 'id'>>;
  startPlatform: NType<Pick<DPlatform, 'name' | 'id'>>;
  startPrice: NType<Price>;
  tags: Omit<DTag, 'comment'>[];
}
