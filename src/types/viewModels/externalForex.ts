import { NType } from '../base';

export interface VExternalForex {
  amount: number;
  baseCurrencyCode: string;
  baseCurrencyName: string;
  rate: NType<{
    currencyName: string;
    rate: number;
    rateForAmount: number;
  }>;
  status: string;
  updatedDate: Date;
}
