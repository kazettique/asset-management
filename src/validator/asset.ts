import { MethodType } from '@prisma/client';
import { z } from 'zod';

import { DAsset, FAsset, MAsset, RAsset, VAsset } from '@/types';

import { AssetCommonValidator, DbBaseValidator, IdValidator, PriceValidator } from './common';

export const DAssetValidator: z.ZodSchema<DAsset> = z.object({
  brand: z.object({ name: z.record(z.string(), z.string().nullable()) }),
  comment: z.string().nullable(),
  endCurrency: z
    .object({
      display: z.string(),
      symbol: z.string(),
    })
    .nullable(),
  endDate: z.date().nullable(),
  endMethod: z
    .object({
      name: z.record(z.string(), z.string().nullable()),
      type: z.nativeEnum(MethodType),
    })
    .nullable(),
  endPrice: PriceValidator.nullable(),
  id: IdValidator,
  isCensored: z.boolean(),
  meta: z.record(z.string(), z.string().or(z.number())),
  name: z.record(z.string(), z.string()),
  startCurrency: z.object({
    display: z.string(),
    symbol: z.string(),
  }),
  startDate: z.date(),
  startMethod: z.object({
    name: z.record(z.string(), z.string().nullable()),
    type: z.nativeEnum(MethodType),
  }),
  startPrice: PriceValidator,
});

export const MAssetValidator: z.ZodSchema<MAsset> = DbBaseValidator.and(AssetCommonValidator);

export const VAssetValidator: z.ZodSchema<VAsset> = MAssetValidator;

export const RAssetValidator: z.ZodSchema<RAsset> = AssetCommonValidator;

export const FAssetValidator: z.ZodSchema<FAsset> = RAssetValidator;
