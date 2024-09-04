import { MethodType } from '@prisma/client';

import { NString, NType } from './base';
import { IconType } from './iconTypes';

export interface GeneralResponse<T> {
  data: T;
  // status: HttpStatusCode;
}

export type Id = string;
export type Price = number;
export type Name = string;

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

export interface CurrencyCommon extends SettingBase {
  display: string;
  symbol: string;
}

export interface MethodCommon extends SettingBase {
  type: MethodType;
}

export type AssetMeta = { key: string; value: string | number }[];

export interface AssetCommon {
  brandId: NType<Id>;
  categoryId: NType<Id>;
  comment: NString;
  endCurrencyId: NType<Id>;
  endDate: NType<Date>;
  endMethodId: NType<Id>;
  endPlatformId: NType<Id>;
  endPrice: NType<Price>;
  isCensored: boolean;
  name: Name;
  ownerId: NType<Id>;
  placeId: NType<Id>;
  startCurrencyId: NType<Id>;
  startDate: NType<Date>;
  startMethodId: NType<Id>;
  startPlatformId: NType<Id>;
  startPrice: NType<Price>;
}
