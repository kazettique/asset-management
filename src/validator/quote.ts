import { z } from 'zod';

import { DQuote, FQuote, FQuoteImport, MQuote, PQuote, VQuote } from '@/types';

import { CommonValidator } from './common';

export abstract class QuoteValidator {
  public static readonly DQuoteValidator: z.ZodSchema<DQuote> = CommonValidator.DbBaseValidator.and(
    CommonValidator.QuoteCommonValidator,
  );

  public static readonly MQuoteValidator: z.ZodSchema<MQuote> = this.DQuoteValidator;

  public static readonly VQuoteValidator: z.ZodSchema<VQuote> = this.MQuoteValidator;

  public static readonly PQuoteValidator: z.ZodSchema<PQuote> = CommonValidator.QuoteCommonValidator;

  public static readonly FQuoteValidator: z.ZodSchema<FQuote> = this.PQuoteValidator;

  public static readonly FQuoteImportValidator: z.ZodSchema<FQuoteImport> = z.object({
    isLegalFileData: z.literal<boolean>(true),
  });
}
