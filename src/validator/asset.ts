import { z } from 'zod';

import { DAsset, FAsset, MAsset, PAsset, VAsset } from '@/types';

import { CommonValidator } from './common';

export abstract class AssetValidator {
  public static readonly DAssetValidator: z.ZodSchema<DAsset> = z
    .object({
      meta: z.record(z.string(), z.any()),
      tags: z.object({ id: CommonValidator.IdValidator, name: CommonValidator.NameValidator }).array(),
    })
    .and(CommonValidator.DbBaseValidator)
    .and(CommonValidator.AssetCommonValidator);

  public static readonly MAssetValidator: z.ZodSchema<MAsset> = z
    .object({
      meta: CommonValidator.AssetMetaValidator,
      tags: z.object({ id: CommonValidator.IdValidator, name: CommonValidator.NameValidator }).array(),
    })
    .and(CommonValidator.DbBaseValidator)
    .and(CommonValidator.AssetCommonValidator);

  public static readonly VAssetValidator: z.ZodSchema<VAsset> = this.MAssetValidator;

  public static readonly RAssetValidator: z.ZodSchema<PAsset> = z
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
    categoryId: CommonValidator.FormOptionValidator,
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
    startCurrencyId: CommonValidator.FormOptionValidator,
    startDate: z.date(),
    startMethodId: CommonValidator.FormOptionValidator,
    startPlatformId: CommonValidator.FormOptionValidator,
    startPrice: CommonValidator.PriceValidator,
    tags: CommonValidator.FormOptionValidator.array(),
  });
}
