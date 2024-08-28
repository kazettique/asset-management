import { MethodType } from '@prisma/client';
import { z } from 'zod';

import { AssetCommon, AssetMeta, CurrencyCommon, DbBase, Id, MethodCommon, Name, Price, SettingBase } from '@/types';

export const NameValidator: z.ZodSchema<Name> = z
  .object({
    nameEn: z.string().nullable(),
    nameJp: z.string().nullable(),
    nameTw: z.string().nullable(),
  })
  .superRefine((values, context) => {
    const nameEnLength: number = values.nameEn?.length || 0;
    const nameTwLength: number = values.nameTw?.length || 0;
    const nameJpLength: number = values.nameJp?.length || 0;

    if ([nameEnLength, nameTwLength, nameJpLength].every((item) => item === 0)) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: 'At least fill one name', path: ['name'] });
    }
  });

export const IdValidator: z.ZodSchema<Id> = z.string().uuid();
export const PriceValidator: z.ZodSchema<Price> = z.number().nonnegative();

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

export const AssetMetaValidator: z.ZodSchema<AssetMeta> = z.object({});

export const AssetCommonValidator: z.ZodSchema<AssetCommon> = z.object({
  brand: z.object({ name: NameValidator }),
  comment: z.string().nullable(),
  endCurrency: z.object({ display: z.string(), symbol: z.string() }).nullable(),
  endDate: z.date().nullable(),
  endMethod: z.object({ name: NameValidator, type: z.nativeEnum(MethodType) }).nullable(),
  endPrice: PriceValidator.nullable(),
  isCensored: z.boolean(),
  meta: AssetMetaValidator,
  name: NameValidator,
  startCurrency: z.object({ display: z.string(), symbol: z.string() }),
  startDate: z.date(),
  startMethod: z.object({ name: NameValidator, type: z.nativeEnum(MethodType) }),
  startPrice: PriceValidator,
});
