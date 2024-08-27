import { MethodType } from '@prisma/client';
import { z } from 'zod';

import { CurrencyCommon, DbBase, Id, MethodCommon, Name, SettingBase } from '@/types';

export const NameValidator: z.ZodSchema<Name> = z.object({
  nameEn: z.string().nullable(),
  nameJp: z.string().nullable(),
  nameTw: z.string().nullable(),
});

export const IdValidator: z.ZodSchema<Id> = z.string().uuid();

export const DbBaseValidator: z.ZodSchema<DbBase> = z.object({
  id: IdValidator,
});

export const SettingBaseValidator: z.ZodSchema<SettingBase> = z.object({
  comment: z.string().nullable(),
  name: NameValidator,
});

export const CurrencyCommonValidator: z.ZodSchema<CurrencyCommon> = z.object({
  comment: z.string().nullable(),
  display: z.string(),
  name: z.string(),
  symbol: z.string(),
});

export const MethodCommonValidator: z.ZodSchema<MethodCommon> = z
  .object({
    type: z.nativeEnum(MethodType),
  })
  .and(SettingBaseValidator);
