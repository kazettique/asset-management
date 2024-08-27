import { NString } from './base';

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
