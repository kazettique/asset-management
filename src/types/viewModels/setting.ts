import {
  MBrand,
  MCategory,
  MMethod,
  MOwner,
  MPlace,
  MPlatform,
  MSettingCurrencyOptionList,
  MSettingDisplayForex,
  MSettingShowCensorAsset,
  MTag,
  SettingKey,
} from '@/types';

export interface VSettingOptions {
  brands: MBrand[];
  categories: MCategory[];
  endMethods: MMethod[];
  owners: MOwner[];
  places: MPlace[];
  platforms: MPlatform[];
  startMethods: MMethod[];
  tags: MTag[];
}

export interface VSetting {
  [SettingKey.DISPLAY_FOREX]: MSettingDisplayForex['value'];
  [SettingKey.CURRENCY_OPTION_LIST]: MSettingCurrencyOptionList['value'];
  [SettingKey.SHOW_CENSOR_ASSET]: MSettingShowCensorAsset['value'];
}
