import { MethodType } from '@prisma/client';
import { z } from 'zod';

import { DMethod, FMethod, MMethod, RMethod, VMethod } from '@/types';

import { IdValidator, MethodCommonValidator } from './common';

export const DMethodValidator: z.ZodSchema<DMethod> = z.object({
  comment: z.string().nullable(),
  id: IdValidator,
  name: z.record(z.string(), z.string()),
  type: z.nativeEnum(MethodType),
});

export const MMethodValidator: z.ZodSchema<MMethod> = z.object({ id: IdValidator }).and(MethodCommonValidator);

export const VMethodValidator: z.ZodSchema<VMethod> = MMethodValidator;

export const RMethodValidator: z.ZodSchema<RMethod> = MethodCommonValidator;

export const FMethodValidator: z.ZodSchema<FMethod> = RMethodValidator;
