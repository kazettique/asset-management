import { MethodType } from '@prisma/client';
import { z } from 'zod';

import { DAsset, FAsset, MAsset, RAsset, VAsset } from '@/types';

import { CommonValidator } from './common';

export abstract class AssetValidator {
  public static readonly DAssetValidator: z.ZodSchema<DAsset> = z
    .object({
      meta: z.record(z.string(), z.string()),
      name: z.record(z.string(), z.string().nullable()),
    })
    .and(CommonValidator.DbBaseValidator)
    .and(CommonValidator.AssetCommonValidator);

  public static readonly MAssetValidator: z.ZodSchema<MAsset> = z
    .object({
      meta: CommonValidator.AssetMetaValidator,
      name: CommonValidator.NameValidator,
    })
    .and(CommonValidator.DbBaseValidator)
    .and(CommonValidator.AssetCommonValidator);

  public static readonly VAssetValidator: z.ZodSchema<VAsset> = this.MAssetValidator;

  public static readonly RAssetValidator: z.ZodSchema<RAsset> = CommonValidator.AssetCommonValidator;

  public static readonly FAssetValidator: z.ZodSchema<FAsset> = this.RAssetValidator;
}
