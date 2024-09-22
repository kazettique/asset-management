import { PQuote } from '../payloadModels';

export interface FQuote extends PQuote {}

export interface FQuoteImport {
  isLegalFileData: boolean | null;
}
