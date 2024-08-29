import { MethodType } from '@prisma/client';
import dayjs from 'dayjs';
import { z } from 'zod';

import { AssetCommon, AssetMeta, CurrencyCommon, DbBase, Id, MethodCommon, Name, Price, SettingBase } from '@/types';

export abstract class CommonValidator {
  public static readonly NameValidator: z.ZodSchema<Name> = z
    .object({
      nameEn: z.string(),
      nameJp: z.string(),
      nameTw: z.string(),
    })
    .superRefine((values, context) => {
      const nameEnLength: number = values.nameEn.length;
      const nameTwLength: number = values.nameTw.length;
      const nameJpLength: number = values.nameJp.length;

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

  public static readonly AssetMetaValidator: z.ZodSchema<AssetMeta> = z.object({
    color: z.string().optional(),
    model: z.string().optional(),
    ram: z.string().optional(),
    size: z.string().optional(),
  });

  public static readonly AssetCommonValidator: z.ZodSchema<AssetCommon> = z
    .object({
      brandId: CommonValidator.IdValidator,
      categoryId: CommonValidator.IdValidator,
      comment: z.string().nullable(),
      endCurrencyId: CommonValidator.IdValidator.nullable(),
      endDate: z.coerce.date().nullable(),
      endMethodId: CommonValidator.IdValidator.nullable(),
      endPlaceId: CommonValidator.IdValidator.nullable(),
      endPrice: this.PriceValidator.nullable(),
      isCensored: z.boolean(),
      startCurrencyId: CommonValidator.IdValidator,
      startDate: z.coerce.date(),
      startMethodId: CommonValidator.IdValidator,
      startPlaceId: CommonValidator.IdValidator,
      startPrice: this.PriceValidator,
    })
    .superRefine((values, context) => {
      if (values.endDate !== null) {
        const startDate = dayjs(values.startDate);
        const endDate = dayjs(values.endDate);

        if (startDate.isAfter(endDate)) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'End date should be after start date.',
            path: ['endDate'],
          });
        }
      }
    });
}
