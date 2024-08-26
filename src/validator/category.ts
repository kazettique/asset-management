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

export const RCategoryValidator: z.ZodSchema<RCategory> = SettingBaseValidator.superRefine((values, context) => {
  const nameEnLength: number = values.name.nameEn?.length || 0;
  const nameTwLength: number = values.name.nameTw?.length || 0;
  const nameJpLength: number = values.name.nameJp?.length || 0;

  if ([nameEnLength, nameTwLength, nameJpLength].every((item) => item === 0)) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: 'At least fill one name', path: ['name'] });
  }
});

export const FCreateCategoryValidator: z.ZodSchema<FCategory> = RCategoryValidator;
