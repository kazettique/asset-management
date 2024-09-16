import { MethodType } from '@prisma/client';

import { Id, NString } from './base';
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

export interface CurrencyCommon extends SettingBase {
  display: string;
  symbol: string;
}

export interface MethodCommon extends SettingBase {
  type: MethodType;
}

export type AssetMeta = { key: string; value: string | number }[];
