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

export interface SettingBase {
  comment: NString;
  name: {
    nameEn: NString;
    nameJp: NString;
    nameTw: NString;
  };
}
