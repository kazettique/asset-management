import { CurrencyCode } from 'currency-codes-ts/dist/types';
import dayjs, { Dayjs } from 'dayjs';

import { ExternalForexFetcher } from '@/fetcher';
import { NType, VExternalForex } from '@/types';
import { Utils } from '@/utils';
import { ExternalForexValidator } from '@/validator';

export abstract class ExternalForexService {
  public static async Find(
    toCurrency: CurrencyCode,
    date: Dayjs = dayjs(),
    fromCurrency: CurrencyCode = 'USD',
  ): Promise<NType<VExternalForex>> {
    const parsedDate = Utils.GetDateTimeString(date);

    const payloadValidation = ExternalForexValidator.PExternalForexRestriction.safeParse({ date: date });

    if (!payloadValidation.success) {
      console.error(payloadValidation.error);

      return null;
    }

    const raw = await ExternalForexFetcher.Find(toCurrency, fromCurrency, parsedDate);

    const validation = ExternalForexValidator.VExternalForexValidator.safeParse(raw);

    if (!validation.success) {
      return null;
    } else {
      return validation.data;
    }
  }
}
