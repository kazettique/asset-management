import { FCurrency } from '@/types';

export abstract class CurrencyConstant {
  public static readonly F_CURRENCY_INITIAL_VALUES: FCurrency = {
    comment: '',
    display: '',
    name: '',
    symbol: '',
  };
}
