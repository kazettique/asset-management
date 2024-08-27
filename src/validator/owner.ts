import { z } from 'zod';

import { DOwner, FOwner, MOwner, ROwner, VOwner } from '@/types';

import { IdValidator, SettingBaseValidator } from './common';

export const DOwnerValidator: z.ZodSchema<DOwner> = z.object({
  comment: z.string().nullable(),
  id: IdValidator,
  name: z.record(z.string(), z.string()),
});

export const MOwnerValidator: z.ZodSchema<MOwner> = z.object({ id: IdValidator }).and(SettingBaseValidator);

export const VOwnerValidator: z.ZodSchema<VOwner> = MOwnerValidator;

export const ROwnerValidator: z.ZodSchema<ROwner> = SettingBaseValidator.superRefine((values, context) => {
  const nameEnLength: number = values.name.nameEn?.length || 0;
  const nameTwLength: number = values.name.nameTw?.length || 0;
  const nameJpLength: number = values.name.nameJp?.length || 0;

  if ([nameEnLength, nameTwLength, nameJpLength].every((item) => item === 0)) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: 'At least fill one name', path: ['name'] });
  }
});

export const FOwnerValidator: z.ZodSchema<FOwner> = ROwnerValidator;
