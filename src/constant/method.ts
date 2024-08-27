import { MethodType } from '@prisma/client';

import { FMethod } from '@/types';

import { DEFAULT_NAME } from './common';

export const F_METHOD_INITIAL_VALUES: FMethod = {
  comment: '',
  name: DEFAULT_NAME,
  type: MethodType.START,
};
