import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { CommonConstant } from '@/constant';
import {
  AssetLifeStatus,
  DAsset,
  FAsset,
  FAssetImport,
  MAsset,
  PAsset,
  PAssetFind,
  VAsset,
  VAssetImportItem,
} from '@/types';

import { CommonValidator } from './common';

export abstract class AssetValidator {
  public static readonly DAssetValidator: z.ZodSchema<DAsset> = z
    .object({
      meta: z.record(z.string(), z.any()).nullable(),
      tags: z.object({ id: CommonValidator.IdValidator, name: CommonValidator.NameValidator }).array(),
    })
    .and(CommonValidator.DbBaseValidator)
    .and(CommonValidator.AssetCommonValidator);

  public static readonly MAssetValidator: z.ZodSchema<MAsset> = z
    .object({
      meta: CommonValidator.AssetMetaValidator.nullable(),
      tags: z.object({ id: CommonValidator.IdValidator, name: CommonValidator.NameValidator }).array(),
    })
    .and(CommonValidator.DbBaseValidator)
    .and(CommonValidator.AssetCommonValidator);

  public static readonly VAssetValidator: z.ZodSchema<VAsset> = this.MAssetValidator;

  public static readonly PAssetValidator: z.ZodSchema<PAsset> = z
    .object({
      meta: CommonValidator.AssetMetaValidator,
      tags: z.object({
        connect: z.object({ id: CommonValidator.IdValidator }).array(),
        create: z.object({ name: CommonValidator.NameValidator }).array(),
      }),
    })
    .and(CommonValidator.AssetCommonValidator);

  public static readonly FAssetValidator: z.ZodSchema<FAsset> = z.object({
    brandId: CommonValidator.FormOptionValidator.nullable(),
    categoryId: CommonValidator.FormOptionValidator.nullable(),
    comment: z.string(),
    endCurrencyId: CommonValidator.FormOptionValidator.nullable(),
    endDate: z.date().nullable(),
    endMethodId: CommonValidator.FormOptionValidator.nullable(),
    endPlatformId: CommonValidator.FormOptionValidator.nullable(),
    endPrice: CommonValidator.PriceValidator,
    isCensored: z.boolean(),
    meta: CommonValidator.AssetMetaValidator,
    name: CommonValidator.NameValidator,
    ownerId: CommonValidator.FormOptionValidator.nullable(),
    placeId: CommonValidator.FormOptionValidator.nullable(),
    startCurrencyId: CommonValidator.FormOptionValidator.nullable(),
    startDate: z.date().nullable(),
    startMethodId: CommonValidator.FormOptionValidator.nullable(),
    startPlatformId: CommonValidator.FormOptionValidator.nullable(),
    startPrice: CommonValidator.PriceValidator,
    tags: CommonValidator.FormOptionValidator.array(),
  });

  public static readonly VAssetImportItemValidator: z.ZodSchema<VAssetImportItem> = z.object({
    comment: z.string(),
    endDate: z.string(),
    endPrice: z.string(),
    name: z.string(),
    startDate: z.string(),
    startPrice: z.string(),
  });

  public static readonly PAssetFindValidator: z.ZodSchema<PAssetFind> = z.object({
    filters: z.object({
      brands: CommonValidator.IdValidator.array().optional(),
      categories: CommonValidator.IdValidator.array().optional(),
      endDateRange: z.tuple([z.coerce.date().nullable(), z.coerce.date().nullable()]).optional(),
      endMethods: CommonValidator.IdValidator.array().optional(),
      endPlatforms: CommonValidator.IdValidator.array().optional(),
      endPriceRange: z
        .tuple([CommonValidator.PriceValidator.nullable(), CommonValidator.PriceValidator.nullable()])
        .optional(),
      lifeStatus: z.nativeEnum(AssetLifeStatus).optional(),
      owners: CommonValidator.IdValidator.array().optional(),
      places: CommonValidator.IdValidator.array().optional(),
      startDateRange: z.tuple([z.coerce.date().nullable(), z.coerce.date().nullable()]).optional(),
      startMethods: CommonValidator.IdValidator.array().optional(),
      startPlatforms: CommonValidator.IdValidator.array().optional(),
      startPriceRange: z
        .tuple([CommonValidator.PriceValidator.nullable(), CommonValidator.PriceValidator.nullable()])
        .optional(),
    }),
    page: z.coerce.number().int().positive().optional(),
    pageSize: z.coerce.number().int().positive().max(CommonConstant.MAX_PAGE_SIZE).optional(),
    sort: z
      .object({
        key: z.literal('startPrice').or(z.literal('endPrice')).or(z.literal('startDate')).or(z.literal('endDate')),
        order: z.nativeEnum(Prisma.SortOrder),
      })
      .optional(),
  });

  public static readonly FAssetImportValidator: z.ZodSchema<FAssetImport> = z.object({
    brandId: CommonValidator.FormOptionValidator.nullable(),
    categoryId: CommonValidator.FormOptionValidator,
    endCurrencyId: CommonValidator.FormOptionValidator.nullable(),
    endMethodId: CommonValidator.FormOptionValidator.nullable(),
    endPlatformId: CommonValidator.FormOptionValidator.nullable(),
    isCensored: z.boolean(),
    isLegalFileData: z.literal<boolean>(true),
    meta: CommonValidator.AssetMetaValidator,
    ownerId: CommonValidator.FormOptionValidator.nullable(),
    placeId: CommonValidator.FormOptionValidator.nullable(),
    startCurrencyId: CommonValidator.FormOptionValidator.nullable(),
    startMethodId: CommonValidator.FormOptionValidator.nullable(),
    startPlatformId: CommonValidator.FormOptionValidator.nullable(),
    tags: CommonValidator.FormOptionValidator.array(),
  });
}
