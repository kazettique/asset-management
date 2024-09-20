import { CurrencyForex } from '../base';
import { DbBase } from '../common';

export interface DForex extends DbBase {
  date: Date;
  rate: CurrencyForex;
  targetCurrency: string;
}
