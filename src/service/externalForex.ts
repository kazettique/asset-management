import { CurrencyCode } from 'currency-codes-ts/dist/types';
import dayjs, { Dayjs } from 'dayjs';

import { CommonConstant } from '@/constant';
import { ExternalForexTransformer } from '@/transformer';
import { MExternalForex, NType, VExternalForex } from '@/types';
import { Utils } from '@/utils';
import { ExternalForexValidator, ForexValidator } from '@/validator';

export abstract class ExternalForexService {
  public static async Find(
    toCurrency: CurrencyCode,
    date: Dayjs = dayjs(),
    fromCurrency: CurrencyCode = 'USD',
  ): Promise<NType<VExternalForex>> {
    const parsedDate = Utils.GetDateTimeString(date);

    const res = await fetch(
      CommonConstant.EXTERNAL_FOREX_API_ROUTE +
        '/' +
        parsedDate +
        '?' +
        new URLSearchParams({ from: fromCurrency, to: toCurrency }).toString(),
      {
        headers: {
          'x-rapidapi-key': process.env.RAPID_API_KEY,
        },
      },
    );

    const data = (await res.json()) as MExternalForex;

    const validation = ExternalForexValidator.MExternalForexValidator.safeParse(data);

    if (!validation.success) {
      return null;
    } else {
      const transformedData = ExternalForexTransformer.MVExternalForexTransformer(validation.data);

      return transformedData;
    }
  }
}
