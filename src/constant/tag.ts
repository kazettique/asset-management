import { FTag, PTagFind } from '@/types';

import { CommonConstant } from './common';
export abstract class TagConstant {
  public static readonly F_TAG_INITIAL_VALUES: FTag = {
    comment: '',
    name: CommonConstant.DEFAULT_NAME,
  };

  public static readonly P_TAG_FIND_DEFAULT: PTagFind = {
    page: CommonConstant.DEFAULT_PAGE,
    pageSize: CommonConstant.DEFAULT_PAGE_SIZE,
  };
}
