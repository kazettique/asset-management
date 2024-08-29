import { FCategory } from '@/types';

import { CommonConstant } from './common';

export abstract class CategoryConstant {
  public static readonly F_CATEGORY_INITIAL_VALUES: FCategory = {
    comment: '',
    name: CommonConstant.DEFAULT_NAME,
  };
}
