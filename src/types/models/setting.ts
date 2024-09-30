import {
  DbBase,
  MBrand,
  MCategory,
  MMethod,
  MOwner,
  MPlace,
  MPlatform,
  MTag,
  SettingCommon,
  SettingKey,
} from '@/types';

export interface MSettingOptions {
  brands: MBrand[];
  categories: MCategory[];
  methods: MMethod[];
  owners: MOwner[];
  places: MPlace[];
  platforms: MPlatform[];
  tags: MTag[];
}

export interface MSettingDisplayForex extends SettingCommon, DbBase {
  key: SettingKey.DISPLAY_FOREX;
  value: string; // TODO: need to change to CurrencyCode later
}

export interface MSettingCurrencyOptionList extends SettingCommon, DbBase {
  key: SettingKey.CURRENCY_OPTION_LIST;
  value: string[]; // TODO: need to change to CurrencyCode later
}

export interface MSettingShowCensorAsset extends SettingCommon, DbBase {
  key: SettingKey.SHOW_CENSOR_ASSET;
  value: boolean;
}

export type MSetting = MSettingDisplayForex | MSettingCurrencyOptionList | MSettingShowCensorAsset;
