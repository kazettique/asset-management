import { MethodType } from '@prisma/client';

import { FMethod } from '@/types';

import { CommonConstant } from './common';

export abstract class MethodConstant {
  public static readonly F_METHOD_INITIAL_VALUES: FMethod = {
    comment: '',
    name: CommonConstant.DEFAULT_NAME,
    type: MethodType.START,
  };
}
