import { CurrencyCommon } from '../common';
import { MCurrency } from '../models';

export interface VCurrency extends MCurrency {}

export interface VCurrencyTable extends CurrencyCommon {
  raw: VCurrency;
}
