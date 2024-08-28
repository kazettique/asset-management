import { z } from 'zod';

import { FCategory, MCategory, RCategory, VCategory } from '@/types';
import { DCategory } from '@/types/dbModels';

import { IdValidator, SettingBaseValidator } from './common';

export const DCategoryValidator: z.ZodSchema<DCategory> = z.object({
  comment: z.string().nullable(),
  id: IdValidator,
  name: z.record(z.string(), z.string()),
});

export const MCategoryValidator: z.ZodSchema<MCategory> = z.object({ id: IdValidator }).and(SettingBaseValidator);

export const VCategoryValidator: z.ZodSchema<VCategory> = MCategoryValidator;

export const RCategoryValidator: z.ZodSchema<RCategory> = SettingBaseValidator;

export const FCategoryValidator: z.ZodSchema<FCategory> = RCategoryValidator;
