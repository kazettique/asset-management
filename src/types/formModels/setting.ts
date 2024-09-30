import { MSettingCurrencyOptionList, MSettingDisplayForex, MSettingShowCensorAsset } from '../models';
import { FormOption } from './common';

export interface FSettingOptions {
  brands: FormOption[];
  categories: FormOption[];
  endMethods: FormOption[];
  owners: FormOption[];
  places: FormOption[];
  platforms: FormOption[];
  startMethods: FormOption[];
  tags: FormOption[];
}

export type FSetting =
  | Pick<MSettingDisplayForex, 'key' | 'value'>
  | Pick<MSettingCurrencyOptionList, 'key' | 'value'>
  | Pick<MSettingShowCensorAsset, 'key' | 'value'>;
