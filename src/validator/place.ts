import { z } from 'zod';

import { FPlace, MPlace, RPlace, VPlace } from '@/types';
import { DPlace } from '@/types/dbModels';

import { IdValidator, SettingBaseValidator } from './common';

export const DPlaceValidator: z.ZodSchema<DPlace> = z.object({
  comment: z.string().nullable(),
  id: IdValidator,
  name: z.record(z.string(), z.string()),
});

export const MPlaceValidator: z.ZodSchema<MPlace> = z.object({ id: IdValidator }).and(SettingBaseValidator);

export const VPlaceValidator: z.ZodSchema<VPlace> = MPlaceValidator;

export const RPlaceValidator: z.ZodSchema<RPlace> = SettingBaseValidator.superRefine((values, context) => {
  const nameEnLength: number = values.name.nameEn?.length || 0;
  const nameTwLength: number = values.name.nameTw?.length || 0;
  const nameJpLength: number = values.name.nameJp?.length || 0;

  if ([nameEnLength, nameTwLength, nameJpLength].every((item) => item === 0)) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: 'At least fill one name', path: ['name'] });
  }
});

export const FPlaceValidator: z.ZodSchema<FPlace> = RPlaceValidator;
