import { MethodType } from '@prisma/client';

import { Id, Name, NString, NType, Price } from './base';
import { DBrand, DCategory, DForex, DMethod, DOwner, DPlace, DPlatform, DTag } from './dbModels';
import { IconType } from './iconTypes';

export interface GeneralResponse<T> {
  data: T;
  // status: HttpStatusCode;
}

// TODO: define for error handling later
export interface ErrorResponse {}

export interface PaginationBase<T> {
  data: T[];
  page: number;
  totalCount: number;
  totalPage: number;
}

export interface MenuItem {
  children: MenuItem[];
  icon: IconType;
  label: string;
  link: NString;
}

export interface DbBase {
  id: Id;
}
export interface SettingBase {
  comment: NString;
  name: string;
}

export interface MethodCommon extends SettingBase {
  type: MethodType;
}

export type AssetMeta = { key: string; value: string | number }[];

export interface AssetCommon {
  brand: Omit<DBrand, 'comment'>;
  category: Omit<DCategory, 'comment'>;
  comment: NString;
  endDate: NType<Date>;
  endForex: NType<Pick<DForex, 'rate' | 'targetCurrency'>>;
  endMethod: NType<Pick<DMethod, 'name' | 'id'>>;
  endPlatform: NType<Omit<DPlatform, 'comment'>>;
  endPrice: NType<Price>;
  isCensored: boolean;
  name: Name;
  owner: Omit<DOwner, 'comment'>;
  place: Omit<DPlace, 'comment'>;
  startDate: NType<Date>;
  startForex: NType<Pick<DForex, 'rate' | 'targetCurrency'>>;
  startMethod: NType<Pick<DMethod, 'name' | 'id'>>;
  startPlatform: NType<Pick<DPlatform, 'name' | 'id'>>;
  startPrice: NType<Price>;
  tags: Omit<DTag, 'comment'>[];
}

export interface ChartDatum {
  id: string;
  label: string;
  value: string | number;
}

export interface QuoteCommon {
  author: string;
  quote: string;
}
