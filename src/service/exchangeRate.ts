import { CurrencyCode } from 'currency-codes-ts/dist/types';

import { ExchangeRateRepository } from '@/repository';
import { Id, MExchangeRate, NType } from '@/types';

export abstract class ExchangeRateService {
  public static async FindAll(): Promise<MExchangeRate[]> {
    return await ExchangeRateRepository.FindAll();
  }

  // TODO: add find many later (with pagination)

  public static async Find(id: Id): Promise<NType<MExchangeRate>> {
    return await ExchangeRateRepository.Find(id);
  }

  public static async Create(date: Date, targetCurrency: CurrencyCode, rate: number): Promise<MExchangeRate> {
    return await ExchangeRateRepository.Create(date, targetCurrency, rate);
  }

  public static async Delete(id: Id): Promise<MExchangeRate> {
    return await ExchangeRateRepository.Delete(id);
  }

  public static async Update(
    id: MExchangeRate['id'],
    date: Date,
    targetCurrency: CurrencyCode,
    rate: number,
  ): Promise<MExchangeRate> {
    return await ExchangeRateRepository.Update(id, date, targetCurrency, rate);
  }
}
