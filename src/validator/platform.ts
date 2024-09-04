import { z } from 'zod';

import { FPlatform, MPlatform, PPlatform, VPlatform } from '@/types';
import { DPlatform } from '@/types/dbModels';

import { CommonValidator } from './common';

export abstract class PlatformValidator {
  public static readonly DPlatformValidator: z.ZodSchema<DPlatform> = CommonValidator.DbBaseValidator.and(
    CommonValidator.SettingBaseValidator,
  );

  public static readonly MPlatformValidator: z.ZodSchema<MPlatform> = this.DPlatformValidator;

  public static readonly VPlatformValidator: z.ZodSchema<VPlatform> = this.MPlatformValidator;

  public static readonly PPlatformValidator: z.ZodSchema<PPlatform> = CommonValidator.SettingBaseValidator;

  public static readonly FPlatformValidator: z.ZodSchema<FPlatform> = this.PPlatformValidator;
}
