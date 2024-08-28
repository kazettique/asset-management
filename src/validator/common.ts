import { MethodType } from '@prisma/client';
import { z } from 'zod';

import { AssetCommon, AssetMeta, CurrencyCommon, DbBase, Id, MethodCommon, Name, Price, SettingBase } from '@/types';

export abstract class CommonValidator {
  public static readonly NameValidator: z.ZodSchema<Name> = z
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

  public static readonly IdValidator: z.ZodSchema<Id> = z.string().uuid();
  public static readonly PriceValidator: z.ZodSchema<Price> = z.number().nonnegative();

  public static readonly DbBaseValidator: z.ZodSchema<DbBase> = z.object({
    id: this.IdValidator,
  });

  public static readonly SettingBaseValidator: z.ZodSchema<SettingBase> = z.object({
    comment: z.string().nullable(),
    name: this.NameValidator,
  });

  public static readonly CurrencyCommonValidator: z.ZodSchema<CurrencyCommon> = z.object({
    comment: z.string().nullable(),
    display: z.string(),
    name: z.string(),
    symbol: z.string(),
  });

  public static readonly MethodCommonValidator: z.ZodSchema<MethodCommon> = z
    .object({
      type: z.nativeEnum(MethodType),
    })
    .and(this.SettingBaseValidator);

  public static readonly AssetMetaValidator: z.ZodSchema<AssetMeta> = z.object({});

  public static readonly AssetCommonValidator: z.ZodSchema<AssetCommon> = z.object({
    brand: z.object({ name: this.NameValidator }),
    comment: z.string().nullable(),
    endCurrency: z.object({ display: z.string(), symbol: z.string() }).nullable(),
    endDate: z.date().nullable(),
    endMethod: z.object({ name: this.NameValidator, type: z.nativeEnum(MethodType) }).nullable(),
    endPrice: this.PriceValidator.nullable(),
    isCensored: z.boolean(),
    meta: this.AssetMetaValidator,
    name: this.NameValidator,
    startCurrency: z.object({ display: z.string(), symbol: z.string() }),
    startDate: z.date(),
    startMethod: z.object({ name: this.NameValidator, type: z.nativeEnum(MethodType) }),
    startPrice: this.PriceValidator,
  });
}
