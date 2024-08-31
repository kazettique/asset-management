import { z } from 'zod';

import { DCurrency, FCurrency, MCurrency, PCurrency, VCurrency } from '@/types';

import { CommonValidator } from './common';

export abstract class CurrencyValidator {
  public static readonly DCurrencyValidator: z.ZodSchema<DCurrency> = CommonValidator.CurrencyCommonValidator.and(
    CommonValidator.DbBaseValidator,
  );

  public static readonly MCurrencyValidator: z.ZodSchema<MCurrency> = this.DCurrencyValidator;

  public static readonly VCurrencyValidator: z.ZodSchema<VCurrency> = this.MCurrencyValidator;

  public static readonly RCurrencyValidator: z.ZodSchema<PCurrency> = CommonValidator.CurrencyCommonValidator;

  public static readonly FCurrencyValidator: z.ZodSchema<FCurrency> = this.RCurrencyValidator;
}
