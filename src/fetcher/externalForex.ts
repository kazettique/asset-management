import { CurrencyCode } from 'currency-codes-ts/dist/types';

import { ExternalForexTransformer } from '@/transformer';
import { MExternalForex, VExternalForex } from '@/types';

export abstract class ExternalForexFetcher {
  // TODO: test use, comment it later
  public static async Find(toCurrency: CurrencyCode, fromCurrency: CurrencyCode = 'USD'): Promise<VExternalForex> {
    const res = await fetch('/api/test');

    const data = (await res.json()) as MExternalForex;

    const transformedData = ExternalForexTransformer.MVExternalForexTransformer(data);

    return transformedData;
  }
}
