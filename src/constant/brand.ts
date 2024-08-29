import { FBrand } from '@/types';

import { CommonConstant } from './common';

export abstract class BrandConstant {
  public static readonly F_BRAND_INITIAL_VALUES: FBrand = {
    comment: '',
    name: CommonConstant.DEFAULT_NAME,
  };
}
