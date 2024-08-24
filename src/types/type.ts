import { NString } from './base';

export interface GeneralResponse<T> {
  data: T;
  // status: HttpStatusCode;
}

export interface Name {
  nameEn: NString;
  nameJp: NString;
  nameTw: string;
}
