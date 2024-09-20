import { DCategory, FCategory, FormOption, Id } from '@/types';

import { CommonConstant } from './common';

export abstract class CategoryConstant {
  public static readonly DEFAULT_CATEGORY: DCategory = {
    ...CommonConstant.DEFAULT_SETTING_BASE,
    id: '28c40ba8-55c5-4171-a317-824c6aba09b3',
  };

  public static readonly DEFAULT_CATEGORY_OPTION: FormOption<Id> = {
    label: this.DEFAULT_CATEGORY.name,
    value: this.DEFAULT_CATEGORY.id,
  };

  public static readonly F_CATEGORY_INITIAL_VALUES: FCategory = {
    comment: '',
    name: CommonConstant.DEFAULT_NAME,
  };
}
