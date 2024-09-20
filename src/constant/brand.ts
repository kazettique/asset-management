import { DBrand, FBrand, FormOption, Id } from '@/types';

import { CommonConstant } from './common';

export abstract class BrandConstant {
  public static readonly BRAND_DEFAULT: DBrand = {
    ...CommonConstant.DEFAULT_SETTING_BASE,
    id: '46241c99-a7f3-49d3-b2f1-6d2916b32e09',
  };

  public static readonly DEFAULT_BRAND_OPTION: FormOption<Id> = {
    label: this.BRAND_DEFAULT.name,
    value: this.BRAND_DEFAULT.id,
  };

  public static readonly F_BRAND_INITIAL_VALUES: FBrand = {
    comment: '',
    name: CommonConstant.DEFAULT_NAME,
  };
}
