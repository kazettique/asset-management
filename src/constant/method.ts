import { MethodType } from '@prisma/client';

import { DMethod, FMethod, FormOption, Id } from '@/types';

import { CommonConstant } from './common';

export abstract class MethodConstant {
  public static readonly DEFAULT_METHOD: DMethod = {
    ...CommonConstant.DEFAULT_SETTING_BASE,
    id: 'af0dff05-5bb0-4b18-bccc-9b54509edd10',
    type: MethodType.BOTH,
  };

  public static readonly DEFAULT_METHOD_OPTION: FormOption<Id> = {
    label: this.DEFAULT_METHOD.name,
    value: this.DEFAULT_METHOD.id,
  };

  public static readonly F_METHOD_INITIAL_VALUES: FMethod = {
    comment: '',
    name: CommonConstant.DEFAULT_NAME,
    type: MethodType.START,
  };
}
