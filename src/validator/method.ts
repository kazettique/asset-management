import { MethodType } from '@prisma/client';
import { z } from 'zod';

import { DMethod, FMethod, MMethod, RMethod, VMethod } from '@/types';

import { CommonValidator } from './common';

export abstract class MethodValidator {
  public static readonly DMethodValidator: z.ZodSchema<DMethod> = z.object({
    comment: z.string().nullable(),
    id: CommonValidator.IdValidator,
    name: z.record(z.string(), z.string()),
    type: z.nativeEnum(MethodType),
  });

  public static readonly MMethodValidator: z.ZodSchema<MMethod> = z
    .object({ id: CommonValidator.IdValidator })
    .and(CommonValidator.MethodCommonValidator);

  public static readonly VMethodValidator: z.ZodSchema<VMethod> = this.MMethodValidator;

  public static readonly RMethodValidator: z.ZodSchema<RMethod> = CommonValidator.MethodCommonValidator;

  public static readonly FMethodValidator: z.ZodSchema<FMethod> = this.RMethodValidator;
}
