import { DPlatform, FPlatform } from '@/types';

import { CommonConstant } from './common';
export abstract class PlatformConstant {
  public static readonly DEFAULT_PLATFORM: DPlatform = {
    ...CommonConstant.DEFAULT_SETTING_BASE,
    id: '9bace7c8-d2b1-4487-8a3e-26190acc1c20',
  };

  public static readonly F_PLATFORM_INITIAL_VALUES: FPlatform = {
    comment: '',
    name: CommonConstant.DEFAULT_NAME,
  };
}
