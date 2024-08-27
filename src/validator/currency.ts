import { z } from 'zod';

import { DCurrency, FCurrency, MCurrency, RCurrency, VCurrency } from '@/types';

import { CurrencyCommonValidator, DbBaseValidator } from './common';

export const DCurrencyValidator: z.ZodSchema<DCurrency> = CurrencyCommonValidator.and(DbBaseValidator);

export const MCurrencyValidator: z.ZodSchema<MCurrency> = DCurrencyValidator;

export const VCurrencyValidator: z.ZodSchema<VCurrency> = MCurrencyValidator;

export const RCurrencyValidator: z.ZodSchema<RCurrency> = CurrencyCommonValidator;

export const FCurrencyValidator: z.ZodSchema<FCurrency> = RCurrencyValidator;
