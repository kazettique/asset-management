import dayjs from 'dayjs';

import { MExternalForex, VExternalForex } from '@/types';

export abstract class ExternalForexTransformer {
  public static MVExternalForexTransformer(src: MExternalForex): VExternalForex {
    const rateList = Object.values(src.rates);
    const firstRate = rateList.length > 0 ? rateList[0] : null;
    const rate =
      firstRate !== null
        ? {
            currencyName: firstRate.currency_name,
            rate: Number(firstRate.rate),
            rateForAmount: Number(firstRate.rate_for_amount),
          }
        : null;

    return {
      amount: Number(src.amount),
      baseCurrencyCode: src.base_currency_code,
      baseCurrencyName: src.base_currency_name,
      rate,
      status: src.status,
      updatedDate: dayjs(src.updated_date).toDate(),
    };
  }
}
