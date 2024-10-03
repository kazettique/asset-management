import dayjs from 'dayjs';
import { z } from 'zod';

import { CommonConstant } from '@/constant';
import { MExternalForex, PExternalForexRestriction, VExternalForex } from '@/types';

export abstract class ExternalForexValidator {
  public static readonly MExternalForexValidator: z.ZodSchema<MExternalForex> = z.object({
    amount: z.string(),
    base_currency_code: z.string(),
    base_currency_name: z.string(),
    rates: z.record(
      z.string(),
      z.object({
        currency_name: z.string(),
        rate: z.string(),
        rate_for_amount: z.string(),
      }),
    ),
    status: z.union([z.literal('success'), z.literal('fail')]),
    updated_date: z.string(),
  });

  public static readonly VExternalForexValidator: z.ZodSchema<VExternalForex> = z.object({
    amount: z.number(),
    baseCurrencyCode: z.string(),
    baseCurrencyName: z.string(),
    rate: z
      .object({
        currencyName: z.string(),
        rate: z.number(),
        rateForAmount: z.number(),
      })
      .nullable(),
    status: z.string(),
    updatedDate: z.date(),
  });

  public static readonly PExternalForexRestriction: z.ZodSchema<PExternalForexRestriction> = z.object({
    date: z.coerce.date().min(dayjs('2010-01-01').toDate(), CommonConstant.MSG_CURRENCY_CONVERTER_DATE_RESTRICTION),
  });
}
