import {
  MSetting,
  MSettingCurrencyOptionList,
  NType,
  VBrand,
  VCategory,
  VForex,
  VMethod,
  VOwner,
  VPlace,
  VPlatform,
  VTag,
} from '@/types';

export interface VSettingOptions {
  brands: VBrand[];
  categories: VCategory[];
  currencyOptionList: MSettingCurrencyOptionList['value'];
  displayForex: NType<VForex>;
  endMethods: VMethod[];
  owners: VOwner[];
  places: VPlace[];
  platforms: VPlatform[];
  startMethods: VMethod[];
  tags: VTag[];
}

export type VSetting = MSetting;

export interface VSettingTable {
  key: string;
  raw: VSetting;
  value: VSetting['value'];
}
