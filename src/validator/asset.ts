import { z } from 'zod';

import { DAsset, FAsset, MAsset, PAsset, VAsset } from '@/types';

import { CommonValidator } from './common';

export abstract class AssetValidator {
  public static readonly DAssetValidator: z.ZodSchema<DAsset> = z
    .object({
      meta: z.record(z.string(), z.any()),
    })
    .and(CommonValidator.DbBaseValidator)
    .and(CommonValidator.AssetCommonValidator);

  public static readonly MAssetValidator: z.ZodSchema<MAsset> = z
    .object({
      meta: CommonValidator.AssetMetaValidator,
    })
    .and(CommonValidator.DbBaseValidator)
    .and(CommonValidator.AssetCommonValidator);

  public static readonly VAssetValidator: z.ZodSchema<VAsset> = this.MAssetValidator;

  public static readonly RAssetValidator: z.ZodSchema<PAsset> = z
    .object({
      meta: CommonValidator.AssetMetaValidator,
      name: CommonValidator.NameValidator,
    })
    .and(CommonValidator.AssetCommonValidator);

  public static readonly FAssetValidator: z.ZodSchema<FAsset> = z.object({
    brandId: z.string(),
    categoryId: z.string(),
    comment: z.string(),
    endCurrencyId: z.string(),
    endDate: z.date().nullable(),
    endMethodId: z.string(),
    endPlatformId: z.string(),
    endPrice: CommonValidator.PriceValidator,
    isCensored: z.boolean(),
    meta: CommonValidator.AssetMetaValidator,
    name: CommonValidator.NameValidator,
    ownerId: z.string(),
    placeId: z.string(),
    startCurrencyId: z.string(),
    startDate: z.date(),
    startMethodId: z.string(),
    startPlatformId: z.string(),
    startPrice: CommonValidator.PriceValidator,
  });
}
