import { QuoteCommon } from '../common';
import { MQuote } from '../models';

export interface VQuote extends MQuote {}

export interface VQuoteTable extends QuoteCommon {
  raw: VQuote;
}
