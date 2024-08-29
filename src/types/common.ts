import { MethodType } from '@prisma/client';

import { NString, NType } from './base';

export interface GeneralResponse<T> {
  data: T;
  // status: HttpStatusCode;
}

export interface Name {
  nameEn: string;
  nameJp: string;
  nameTw: string;
}

export type Id = string;
export type Price = number;

export interface DbBase {
  id: Id;
}
export interface SettingBase {
  comment: NString;
  name: {
    nameEn: NString;
    nameJp: NString;
    nameTw: NString;
  };
}

export interface CurrencyCommon {
  comment: NString;
  display: string;
  name: string;
  symbol: string;
}

export interface MethodCommon extends SettingBase {
  type: MethodType;
}

// TODO: how to define it dynamically?
export interface AssetMeta {
  color?: string;
  model?: string;
  ram?: string;
  size?: string;
  ssd?: string;
}

export interface AssetCommon {
  brandId: Id;
  categoryId: Id;
  comment: NString;
  endCurrencyId: NType<Id>;
  endDate: NType<Date>;
  endMethodId: NType<Id>;
  endPlaceId: NType<Id>;
  endPrice: NType<Price>;
  isCensored: boolean;
  startCurrencyId: Id;
  startDate: Date;
  startMethodId: Id;
  startPlaceId: Id;
  startPrice: Price;
}
