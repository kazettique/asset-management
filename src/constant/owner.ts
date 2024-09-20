import { DOwner, FOwner } from '@/types';

import { CommonConstant } from './common';
export abstract class OwnerConstant {
  public static readonly DEFAULT_OWNER: DOwner = {
    ...CommonConstant.DEFAULT_SETTING_BASE,
    id: '59efb179-59f0-4e89-99e1-027ae46d187a',
  };

  public static readonly F_OWNER_INITIAL_VALUES: FOwner = {
    comment: '',
    name: CommonConstant.DEFAULT_NAME,
  };
}
