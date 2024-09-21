import { z } from 'zod';

import { DDashboardAggregate, MDashboardAggregate, VDashboardAggregate } from '@/types';

import { CommonValidator } from './common';

export abstract class DashboardValidator {
  public static readonly DDashboardAggregateValidator: z.ZodSchema<DDashboardAggregate> = z.object({
    category: z
      .object({
        _avg: z.object({
          endPrice: CommonValidator.PriceValidator.nullable(),
          startPrice: CommonValidator.PriceValidator.nullable(),
        }),
        _count: z.object({
          categoryId: z.number().nullable(),
        }),
        _max: z.object({
          endPrice: CommonValidator.PriceValidator.nullable(),
          startPrice: CommonValidator.PriceValidator.nullable(),
        }),
        _sum: z.object({
          endPrice: CommonValidator.PriceValidator.nullable(),
          startPrice: CommonValidator.PriceValidator.nullable(),
        }),
        categoryId: CommonValidator.IdValidator,
      })
      .array(),
    deadCount: z.number(),
    general: z.object({
      _avg: z.object({
        endPrice: CommonValidator.PriceValidator.nullable(),
        startPrice: CommonValidator.PriceValidator.nullable(),
      }),
      _max: z.object({
        endPrice: CommonValidator.PriceValidator.nullable(),
        startPrice: CommonValidator.PriceValidator.nullable(),
      }),
      _sum: z.object({
        endPrice: CommonValidator.PriceValidator.nullable(),
        startPrice: CommonValidator.PriceValidator.nullable(),
      }),
    }),
    liveCount: z.number(),
    ranking: z
      .object({
        category: z.object({ name: z.string() }),
        name: z.string(),
        startDate: z.date().nullable(),
        startForex: z.object({ rate: z.number().positive(), targetCurrency: z.string().length(3) }).nullable(),
        startPrice: CommonValidator.PriceValidator.nullable(),
      })
      .array(),
  });

  public static readonly MDashboardAggregateValidator: z.ZodSchema<MDashboardAggregate> = z.object({
    category: z
      .object({
        avg: z.object({
          endPrice: CommonValidator.PriceValidator.nullable(),
          startPrice: CommonValidator.PriceValidator.nullable(),
        }),
        categoryId: CommonValidator.IdValidator,
        count: z.object({
          categoryId: z.number().nullable(),
        }),
        max: z.object({
          endPrice: CommonValidator.PriceValidator.nullable(),
          startPrice: CommonValidator.PriceValidator.nullable(),
        }),
        sum: z.object({
          endPrice: CommonValidator.PriceValidator.nullable(),
          startPrice: CommonValidator.PriceValidator.nullable(),
        }),
      })
      .array(),
    deadCount: z.number(),
    general: z.object({
      avg: z.object({
        endPrice: CommonValidator.PriceValidator.nullable(),
        startPrice: CommonValidator.PriceValidator.nullable(),
      }),
      max: z.object({
        endPrice: CommonValidator.PriceValidator.nullable(),
        startPrice: CommonValidator.PriceValidator.nullable(),
      }),
      sum: z.object({
        endPrice: CommonValidator.PriceValidator.nullable(),
        startPrice: CommonValidator.PriceValidator.nullable(),
      }),
    }),
    liveCount: z.number(),
    ranking: z
      .object({
        categoryName: z.string(),
        name: z.string(),
        startDate: z.date().nullable(),
        startForex: z.object({ rate: z.number().positive(), targetCurrency: z.string().length(3) }).nullable(),
        startPrice: CommonValidator.PriceValidator.nullable(),
      })
      .array(),
  });

  public static readonly VDashboardAggregateValidator: z.ZodSchema<VDashboardAggregate> =
    this.MDashboardAggregateValidator;
}
