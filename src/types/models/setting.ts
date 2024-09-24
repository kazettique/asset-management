import { MBrand, MCategory, MMethod, MOwner, MPlace, MPlatform, MTag } from '@/types';

export interface MSettingOptions {
  brands: MBrand[];
  categories: MCategory[];
  methods: MMethod[];
  owners: MOwner[];
  places: MPlace[];
  platforms: MPlatform[];
  tags: MTag[];
}

export type MSettingDisplayForex = {
  key: 'displayForex';
  value: string;
};

export type MSettingCurrencyOptionList = {
  key: 'currencyOptionList';
  value: string[];
};

export type MSettingShowCensorAsset = {
  key: 'showCensorAsset';
  value: boolean;
};

export type MSetting = MSettingDisplayForex | MSettingCurrencyOptionList | MSettingShowCensorAsset;
