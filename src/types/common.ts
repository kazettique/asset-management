import { MethodType } from '@prisma/client';

import { Id, Name, NString, NType, Price } from './base';
import { IconType } from './iconTypes';
import { MBrand, MCategory } from './models';

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

// TODO: remove later
// export interface AssetCommon {
//   brandId: NType<Id>;
//   categoryId: NType<Id>;
//   comment: NString;
//   endCurrencyId: NType<Id>;
//   endDate: NType<Date>;
//   endMethodId: NType<Id>;
//   endPlatformId: NType<Id>;
//   endPrice: NType<Price>;
//   isCensored: boolean;
//   name: Name;
//   ownerId: NType<Id>;
//   placeId: NType<Id>;
//   startCurrencyId: NType<Id>;
//   startDate: NType<Date>;
//   startMethodId: NType<Id>;
//   startPlatformId: NType<Id>;
//   startPrice: NType<Price>;
// }
