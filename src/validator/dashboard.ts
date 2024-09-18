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
        categoryId: CommonValidator.IdValidator.nullable(),
      })
      .array(),
    endCurrency: z
      .object({
        _count: z.object({ endCurrency: z.number().nullable() }),
        endCurrency: z.string().nullable(),
      })
      .array(),
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
    ranking: z
      .object({
        category: z.object({ name: z.string() }).nullable(),
        name: z.string(),
        startCurrency: z.string().nullable(),
        startDate: z.date().nullable(),
        startPrice: CommonValidator.PriceValidator.nullable(),
      })
      .array(),
    startCurrency: z
      .object({
        _count: z.object({ startCurrency: z.number().nullable() }),
        startCurrency: z.string().nullable(),
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
        categoryId: CommonValidator.IdValidator.nullable(),
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
    endCurrency: z
      .object({
        assetCount: z.number().nullable(),
        currencyName: z.string().nullable(),
      })
      .array(),
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
    ranking: z
      .object({
        categoryName: z.string().nullable(),
        name: z.string(),
        startCurrency: z.string().nullable(),
        startDate: z.date().nullable(),
        startPrice: CommonValidator.PriceValidator.nullable(),
      })
      .array(),
    startCurrency: z
      .object({
        assetCount: z.number().nullable(),
        currencyName: z.string().nullable(),
      })
      .array(),
  });

  public static readonly VDashboardAggregateValidator: z.ZodSchema<VDashboardAggregate> =
    this.MDashboardAggregateValidator;
}
