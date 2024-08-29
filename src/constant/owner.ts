import { FOwner } from '@/types';

import { CommonConstant } from './common';
export abstract class OwnerConstant {
  public static readonly F_OWNER_INITIAL_VALUES: FOwner = {
    comment: '',
    name: CommonConstant.DEFAULT_NAME,
  };
}
