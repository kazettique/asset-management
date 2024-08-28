import { MethodType } from '@prisma/client';

import { FMethod } from '@/types';

import { Constants } from './common';

export const F_METHOD_INITIAL_VALUES: FMethod = {
  comment: '',
  name: Constants.DEFAULT_NAME,
  type: MethodType.START,
};
