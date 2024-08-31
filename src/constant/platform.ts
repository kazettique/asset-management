import { FPlatform } from '@/types';

import { CommonConstant } from './common';
export abstract class PlatformConstant {
  public static readonly F_PLATFORM_INITIAL_VALUES: FPlatform = {
    comment: '',
    name: CommonConstant.DEFAULT_NAME,
  };
}
