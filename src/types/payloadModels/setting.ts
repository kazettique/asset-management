import { MSettingCurrencyOptionList, MSettingDisplayForex, MSettingShowCensorAsset } from '../models';

export type PSetting =
  | Pick<MSettingDisplayForex, 'value'>
  | Pick<MSettingCurrencyOptionList, 'value'>
  | Pick<MSettingShowCensorAsset, 'value'>;
