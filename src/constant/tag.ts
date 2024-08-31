import { FTag } from '@/types';

import { CommonConstant } from './common';
export abstract class TagConstant {
  public static readonly F_TAG_INITIAL_VALUES: FTag = {
    comment: '',
    name: CommonConstant.DEFAULT_NAME,
  };
}
