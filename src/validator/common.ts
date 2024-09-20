import { MethodType } from '@prisma/client';
import { z } from 'zod';

import { CommonConstant } from '@/constant';
import {
  AssetCommon,
  AssetMeta,
  CurrencyForex,
  DbBase,
  FormOption,
  Id,
  MethodCommon,
  Name,
  PFindPagination,
  Price,
  SettingBase,
} from '@/types';

import { ForexValidator } from './forex';

export abstract class CommonValidator {
  public static readonly IdValidator: z.ZodSchema<Id> = z.string().uuid();

  public static readonly PriceValidator: z.ZodSchema<Price> = z.coerce.number().nonnegative();

  // TODO: add more detailed validation, ex: no symbols, no whitespace ...etc
  public static readonly NameValidator: z.ZodSchema<Name> = z.string().min(1);

  public static readonly PFindPageValidator: z.ZodSchema<PFindPagination> = z.object({
    page: z.coerce.number().int().positive().optional(),
    pageSize: z.coerce.number().int().positive().max(CommonConstant.MAX_PAGE_SIZE).optional(),
  });

  public static readonly CurrencyForexValidator: z.ZodSchema<CurrencyForex> = z.number().positive();

  public static readonly DbBaseValidator: z.ZodSchema<DbBase> = z.object({
    id: this.IdValidator,
  });

  public static readonly SettingBaseValidator: z.ZodSchema<SettingBase> = z.object({
    comment: z.string().nullable(),
    name: this.NameValidator,
  });

  public static readonly MethodCommonValidator: z.ZodSchema<MethodCommon> = z
    .object({
      type: z.nativeEnum(MethodType),
    })
    .and(this.SettingBaseValidator);

  public static readonly FormOptionValidator: z.ZodSchema<FormOption> = z.object({
    __isNew__: z.boolean().optional(),
    label: z.string(),
    value: z.string(),
  });

  public static readonly AssetMetaValidator: z.ZodSchema<AssetMeta> = z
    .object({ key: z.string(), value: z.string().or(z.number()) })
    .array();

  public static readonly AssetCommonValidator: z.ZodSchema<AssetCommon> = z.object({
    brand: z.object({ id: CommonValidator.IdValidator, name: z.string() }),
    category: z.object({ id: CommonValidator.IdValidator, name: z.string() }),
    comment: z.string().nullable(),
    endDate: z.date().nullable(),
    endForex: z
      .object({
        rate: CommonValidator.CurrencyForexValidator,
        targetCurrency: z.string().length(3),
      })
      .nullable(),
    endMethod: z.object({ id: CommonValidator.IdValidator, name: z.string() }).nullable(),
    endPlatform: z.object({ id: CommonValidator.IdValidator, name: z.string() }).nullable(),
    endPrice: CommonValidator.PriceValidator.nullable(),
    isCensored: z.boolean(),
    name: CommonValidator.NameValidator,
    owner: z.object({ id: CommonValidator.IdValidator, name: z.string() }),
    place: z.object({ id: CommonValidator.IdValidator, name: z.string() }),
    startDate: z.date().nullable(),
    startForex: z
      .object({
        rate: CommonValidator.CurrencyForexValidator,
        targetCurrency: z.string().length(3),
      })
      .nullable(),
    startMethod: z.object({ id: CommonValidator.IdValidator, name: z.string() }).nullable(),
    startPlatform: z.object({ id: CommonValidator.IdValidator, name: z.string() }).nullable(),
    startPrice: CommonValidator.PriceValidator.nullable(),
    tags: z.object({ id: CommonValidator.IdValidator, name: CommonValidator.NameValidator }).array(),
  });
}
