import { MethodType } from '@prisma/client';

import { NString, NType } from './base';

export interface GeneralResponse<T> {
  data: T;
  // status: HttpStatusCode;
}

export interface Name {
  nameEn: NString;
  nameJp: NString;
  nameTw: NString;
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
  // common meta
  color?: string;

  // for electronic
  model?: string;
  ram?: string;

  // for cloth
  size?: string;
}

export interface AssetCommon {
  brand: { name: Name };
  comment: NString;
  endCurrency: NType<{ display: string; symbol: string }>;
  endDate: NType<Date>;
  endMethod: NType<{ name: Name; type: MethodType }>;
  endPrice: NType<Price>;
  isCensored: boolean;
  meta: AssetMeta;
  name: Name;
  startCurrency: { display: string; symbol: string };
  startDate: Date;
  startMethod: { name: Name; type: MethodType };
  startPrice: Price;
}
