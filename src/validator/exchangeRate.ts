import { z } from 'zod';

import { DExchangeRate, MExchangeRate, VExchangeRate } from '@/types';

import { CommonValidator } from './common';

export abstract class ExchangeRateValidator {
  public static readonly DExchangeRateValidator: z.ZodSchema<DExchangeRate> = z
    .object({
      date: z.date(),
      rate: CommonValidator.CurrencyExchangeRateValidator,
      targetCurrency: z.string().length(3),
    })
    .and(CommonValidator.DbBaseValidator);

  public static readonly MExchangeRateValidator: z.ZodSchema<MExchangeRate> = this.DExchangeRateValidator;

  public static readonly VExchangeRateValidator: z.ZodSchema<VExchangeRate> = this.MExchangeRateValidator;
}
