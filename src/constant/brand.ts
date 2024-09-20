import { DBrand, FBrand } from '@/types';

import { CommonConstant } from './common';

export abstract class BrandConstant {
  public static readonly BRAND_DEFAULT: DBrand = {
    ...CommonConstant.DEFAULT_SETTING_BASE,
    id: '46241c99-a7f3-49d3-b2f1-6d2916b32e09',
  };

  public static readonly F_BRAND_INITIAL_VALUES: FBrand = {
    comment: '',
    name: CommonConstant.DEFAULT_NAME,
  };
}
