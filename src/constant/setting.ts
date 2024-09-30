import {
  FSetting,
  FSettingOptions,
  MSettingCurrencyOptionList,
  MSettingDisplayForex,
  MSettingShowCensorAsset,
  SettingKey,
} from '@/types';

export abstract class SettingConstant {
  public static readonly DEFAULT_F_SETTING_OPTIONS: FSettingOptions = {
    brands: [],
    categories: [],
    endMethods: [],
    owners: [],
    places: [],
    platforms: [],
    startMethods: [],
    tags: [],
  };

  public static readonly DEFAULT_M_SETTING_DISPLAY_FOREX: MSettingDisplayForex = {
    id: '96efebed-d0b6-4429-879d-92175405dd10',
    key: SettingKey.DISPLAY_FOREX,
    value: 'USD',
  };

  public static readonly DEFAULT_M_SETTING_CURRENCY_OPTION_LIST: MSettingCurrencyOptionList = {
    id: '2c30860c-1587-4762-bca2-b513e492f603',
    key: SettingKey.CURRENCY_OPTION_LIST,
    value: ['USD', 'TWD', 'JPY'],
  };

  public static readonly DEFAULT_M_SETTING_SHOW_CENSOR_ASSET: MSettingShowCensorAsset = {
    id: '39e63bb6-881e-4ef6-b2be-624803357c51',
    key: SettingKey.SHOW_CENSOR_ASSET,
    value: false,
  };

  public static readonly F_SETTING_INITIAL_VALUES: FSetting = {
    key: SettingKey.DISPLAY_FOREX,
    value: '',
  };
}
