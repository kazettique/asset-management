import { MethodType } from '@prisma/client';
import { z } from 'zod';

import { DAsset } from '@/types';

import { IdValidator, PriceValidator } from './common';

export const DAssetValidator: z.ZodSchema<DAsset> = z.object({
  brand: z.object({ name: z.record(z.string(), z.string()) }),
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
      name: z.record(z.string(), z.string()),
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
    name: z.record(z.string(), z.string()),
    type: z.nativeEnum(MethodType),
  }),
  startPrice: PriceValidator,
});
