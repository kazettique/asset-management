import { DbBase, Id, NType } from './types';

export type Age = number;

// export interface DCompany {
//   id: string; // uuid
//   name: string;
// }

export interface PersonCommon {
  age: Age;
  companyId: NType<Id>;
  name: string;
}

export interface DPerson extends DbBase, PersonCommon {}

export interface MPerson extends DPerson {}

export interface VPerson extends MPerson {}

export interface FPerson {
  age: Age;
  companyId: Id;
  name: string;
}

export interface RPerson extends PersonCommon {}
