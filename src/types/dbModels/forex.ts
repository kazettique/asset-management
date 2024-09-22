import { ForexRate } from '../base';
import { DbBase } from '../common';

export interface DForex extends DbBase {
  date: Date;
  rate: ForexRate;
  targetCurrency: string;
}
