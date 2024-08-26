import { z } from 'zod';

import { DBrand, FBrand, MBrand, RBrand, VBrand } from '@/types';

import { IdValidator, SettingBaseValidator } from './common';

export const DBrandValidator: z.ZodSchema<DBrand> = z.object({
  comment: z.string().nullable(),
  id: IdValidator,
  name: z.record(z.string(), z.string()),
});

export const MBrandValidator: z.ZodSchema<MBrand> = z.object({ id: IdValidator }).and(SettingBaseValidator);

export const VBrandValidator: z.ZodSchema<VBrand> = MBrandValidator;

export const RBrandValidator: z.ZodSchema<RBrand> = SettingBaseValidator.superRefine((values, context) => {
  const nameEnLength: number = values.name.nameEn?.length || 0;
  const nameTwLength: number = values.name.nameTw?.length || 0;
  const nameJpLength: number = values.name.nameJp?.length || 0;

  if ([nameEnLength, nameTwLength, nameJpLength].every((item) => item === 0)) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: 'At least fill one name', path: ['name'] });
  }
});

export const FBrandValidator: z.ZodSchema<FBrand> = RBrandValidator;
