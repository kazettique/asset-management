import { Prisma } from '@prisma/client';
import { CurrencyCode } from 'currency-codes-ts/dist/types';

import { db } from '@/lib/db';
import { ExchangeRateTransformer } from '@/transformer';
import { DExchangeRate, Id, MExchangeRate, NType } from '@/types';

const queryObj: Prisma.ExchangeRateSelect = {
  date: true,
  id: true,
  rate: true,
  targetCurrency: true,
};

export abstract class ExchangeRateRepository {
  public static async FindAll(): Promise<MExchangeRate[]> {
    const rawData: DExchangeRate[] = await db.exchangeRate.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((exchangeRate) => ExchangeRateTransformer.DMExchangeRateTransformer(exchangeRate));

    return parsedData;
  }

  // TODO: add find many later (with pagination)

  public static async Find(id: Id): Promise<NType<MExchangeRate>> {
    const rawData: NType<DExchangeRate> = await db.exchangeRate.findUnique({
      select: queryObj,
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return ExchangeRateTransformer.DMExchangeRateTransformer(rawData);
    }
  }

  public static async Create(date: Date, targetCurrency: CurrencyCode, rate: number): Promise<MExchangeRate> {
    const rawData = await db.exchangeRate.create({
      data: { date, rate, targetCurrency },
      select: queryObj,
    });

    return ExchangeRateTransformer.DMExchangeRateTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<MExchangeRate> {
    const rawData = await db.exchangeRate.delete({
      select: queryObj,
      where: { id },
    });

    return ExchangeRateTransformer.DMExchangeRateTransformer(rawData);
  }

  public static async Update(
    id: MExchangeRate['id'],
    date: Date,
    targetCurrency: CurrencyCode,
    rate: number,
  ): Promise<MExchangeRate> {
    const rawData = await db.exchangeRate.update({
      data: { date, rate, targetCurrency },
      select: queryObj,
      where: { id },
    });

    return ExchangeRateTransformer.DMExchangeRateTransformer(rawData);
  }
}
