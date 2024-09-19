import { CurrencyExchangeRate } from '../base';
import { DbBase } from '../common';

export interface DExchangeRate extends DbBase {
  date: Date;
  rate: CurrencyExchangeRate;
  targetCurrency: string;
}
