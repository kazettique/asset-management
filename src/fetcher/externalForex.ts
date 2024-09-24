import { CurrencyCode } from 'currency-codes-ts/dist/types';
import { ofetch } from 'ofetch';

import { ExternalForexTransformer } from '@/transformer';
import { MExternalForex, VExternalForex } from '@/types';

import { FetchOptionFactory } from './factory';

const API_URL: string = '';

export abstract class ExternalForexFetcher {
  public static async Find(
    toCurrency: CurrencyCode,
    fromCurrency: CurrencyCode = 'USD',
    date: string,
  ): Promise<VExternalForex> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Find.name,
      apiType: 'INTERNAL',
      method: 'GET',
      query: { base: fromCurrency, to: toCurrency },
    });

    const rawData = await ofetch<MExternalForex>(`${API_URL}/${date}`, fetchOption);

    return ExternalForexTransformer.MVExternalForexTransformer(rawData);
  }
}
