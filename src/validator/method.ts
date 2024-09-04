import { MethodType } from '@prisma/client';
import { z } from 'zod';

import { DMethod, FMethod, MMethod, PMethod, VMethod } from '@/types';

import { CommonValidator } from './common';

export abstract class MethodValidator {
  public static readonly DMethodValidator: z.ZodSchema<DMethod> = z
    .object({
      type: z.nativeEnum(MethodType),
    })
    .and(CommonValidator.DbBaseValidator)
    .and(CommonValidator.SettingBaseValidator);

  public static readonly MMethodValidator: z.ZodSchema<MMethod> = this.DMethodValidator;

  public static readonly VMethodValidator: z.ZodSchema<VMethod> = this.MMethodValidator;

  public static readonly PMethodValidator: z.ZodSchema<PMethod> = CommonValidator.MethodCommonValidator;

  public static readonly FMethodValidator: z.ZodSchema<FMethod> = this.PMethodValidator;
}
