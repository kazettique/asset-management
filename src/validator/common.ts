import { z } from 'zod';

import { Id, Name, SettingBase } from '@/types';

export const NameValidator: z.ZodSchema<Name> = z.object({
  nameEn: z.string().nullable(),
  nameJp: z.string().nullable(),
  nameTw: z.string().nullable(),
});

export const IdValidator: z.ZodSchema<Id> = z.string().uuid();

export const SettingBaseValidator: z.ZodSchema<SettingBase> = z.object({
  comment: z.string().nullable(),
  name: NameValidator,
});
