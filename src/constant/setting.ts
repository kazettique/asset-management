import { FSettingOptions } from '@/types';

export abstract class SettingConstant {
  public static readonly F_SETTING_OPTIONS: FSettingOptions = {
    brands: [],
    categories: [],
    currencies: [],
    methods: [],
    owners: [],
    places: [],
  };
}
