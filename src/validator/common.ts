import { MethodType } from '@prisma/client';
import { z } from 'zod';

import { CommonConstant } from '@/constant';
import {
  AssetMeta,
  CurrencyCommon,
  CurrencyExchangeRate,
  DbBase,
  FormOption,
  Id,
  MethodCommon,
  Name,
  PFindPagination,
  Price,
  SettingBase,
} from '@/types';

export abstract class CommonValidator {
  public static readonly IdValidator: z.ZodSchema<Id> = z.string().uuid();

  public static readonly PriceValidator: z.ZodSchema<Price> = z.coerce.number().nonnegative();

  // TODO: add more detailed validation, ex: no symbols, no whitespace ...etc
  public static readonly NameValidator: z.ZodSchema<Name> = z.string().min(1);

  public static readonly PFindPageValidator: z.ZodSchema<PFindPagination> = z.object({
    page: z.coerce.number().int().positive().optional(),
    pageSize: z.coerce.number().int().positive().max(CommonConstant.MAX_PAGE_SIZE).optional(),
  });

  public static readonly CurrencyExchangeRateValidator: z.ZodSchema<CurrencyExchangeRate> = z.number().positive();

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
    value: z.string(),
  });

  public static readonly AssetMetaValidator: z.ZodSchema<AssetMeta> = z
    .object({ key: z.string(), value: z.string().or(z.number()) })
    .array();
}
