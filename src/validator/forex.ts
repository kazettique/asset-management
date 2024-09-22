import { CurrencyCode } from 'currency-codes-ts/dist/types';
import { z } from 'zod';

import { DForex, MForex, VForex } from '@/types';
import { PForex } from '@/types/payloadModels/forex';

import { CommonValidator } from './common';

export abstract class ForexValidator {
  public static readonly DForexValidator: z.ZodSchema<DForex> = z
    .object({
      date: z.date(),
      rate: CommonValidator.ForexRateValidator,
      targetCurrency: z.string().length(3),
    })
    .and(CommonValidator.DbBaseValidator);

  public static readonly MForexValidator: z.ZodSchema<MForex> = this.DForexValidator;

  public static readonly VForexValidator: z.ZodSchema<VForex> = this.MForexValidator;

  public static readonly PForexValidator: z.ZodSchema<PForex> = z.object({
    date: z.date(),
    rate: CommonValidator.ForexRateValidator,
    targetCurrency: z.string().length(3),
  });
}
