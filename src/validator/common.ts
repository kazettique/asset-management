import { MethodType } from '@prisma/client';
import dayjs from 'dayjs';
import { z } from 'zod';

import {
  AssetCommon,
  AssetMeta,
  CurrencyCommon,
  DbBase,
  FormOption,
  Id,
  MethodCommon,
  Name,
  Price,
  SettingBase,
} from '@/types';

export abstract class CommonValidator {
  public static readonly IdValidator: z.ZodSchema<Id> = z.string().uuid();
  public static readonly PriceValidator: z.ZodSchema<Price> = z.number().nonnegative();
  // TODO: add more detailed validation, ex: no symbols, no whitespace ...etc
  public static readonly NameValidator: z.ZodSchema<Name> = z.string().min(1);

  public static readonly DbBaseValidator: z.ZodSchema<DbBase> = z.object({
    id: this.IdValidator,
  });

  public static readonly SettingBaseValidator: z.ZodSchema<SettingBase> = z.object({
    comment: z.string().nullable(),
    name: this.NameValidator,
  });

  public static readonly CurrencyCommonValidator: z.ZodSchema<CurrencyCommon> = z
    .object({
      display: z.string(),
      symbol: z.string(),
    })
    .and(this.SettingBaseValidator);

  public static readonly MethodCommonValidator: z.ZodSchema<MethodCommon> = z
    .object({
      type: z.nativeEnum(MethodType),
    })
    .and(this.SettingBaseValidator);

  public static readonly FormOptionValidator: z.ZodSchema<FormOption> = z.object({
    __isNew__: z.boolean().optional(),
    label: z.string(),
    value: z.string().min(1),
  });

  public static readonly AssetMetaValidator: z.ZodSchema<AssetMeta> = z
    .tuple([z.string(), z.string().or(z.number())])
    .array();

  public static readonly AssetCommonValidator: z.ZodSchema<AssetCommon> = z
    .object({
      brandId: CommonValidator.IdValidator.nullable(),
      categoryId: CommonValidator.IdValidator,
      comment: z.string().nullable(),
      endCurrencyId: CommonValidator.IdValidator.nullable(),
      endDate: z.coerce.date().nullable(),
      endMethodId: CommonValidator.IdValidator.nullable(),
      endPlatformId: CommonValidator.IdValidator.nullable(),
      endPrice: this.PriceValidator.nullable(),
      isCensored: z.boolean(),
      name: CommonValidator.NameValidator,
      ownerId: CommonValidator.IdValidator.nullable(),
      placeId: CommonValidator.IdValidator.nullable(),
      startCurrencyId: CommonValidator.IdValidator,
      startDate: z.coerce.date(),
      startMethodId: CommonValidator.IdValidator,
      startPlatformId: CommonValidator.IdValidator,
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
