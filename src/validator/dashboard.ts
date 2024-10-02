import { z } from 'zod';

import {
  DDashboardAggregate,
  DDashboardCalendar,
  MDashboardAggregate,
  MDashboardCalendar,
  VDashboardAggregate,
  VDashboardCalendar,
} from '@/types';

import { CommonValidator } from './common';

export abstract class DashboardValidator {
  public static readonly DDashboardAggregateValidator: z.ZodSchema<DDashboardAggregate> = z.object({
    allCategories: z
      .object({
        id: CommonValidator.IdValidator,
        name: CommonValidator.NameValidator,
      })
      .array(),
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
    displayForex: z.string().nullable(),
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
        categoryName: CommonValidator.NameValidator,
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
    displayForex: z.string().nullable(),
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

  public static readonly DDashboardCalendarValidator: z.ZodSchema<DDashboardCalendar> = z.object({
    birthday: z
      .object({
        name: z.string(),
        rate: CommonValidator.ForexRateValidator.nullable(),
        startDate: z.date(),
        startPrice: CommonValidator.PriceValidator.nullable(),
        targetCurrency: z.string().length(3).nullable(),
      })
      .array(),
  });

  public static readonly MDashboardCalendarValidator: z.ZodSchema<MDashboardCalendar> =
    this.DDashboardCalendarValidator;

  public static readonly VDashboardCalendarValidator: z.ZodSchema<VDashboardCalendar> =
    this.MDashboardCalendarValidator;
}
