import { Prisma } from '@prisma/client';
import { CurrencyCode } from 'currency-codes-ts/dist/types';
import dayjs from 'dayjs';

import { prisma } from '@/lib/db';
import { ForexTransformer } from '@/transformer';
import { DForex, Id, MForex, NType } from '@/types';

const queryObj: Prisma.ForexSelect = {
  date: true,
  id: true,
  rate: true,
  targetCurrency: true,
};

export abstract class ForexRepository {
  public static async FindAll(): Promise<MForex[]> {
    const rawData: DForex[] = await prisma.forex.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((forex) => ForexTransformer.DMForexTransformer(forex));

    return parsedData;
  }

  // TODO: add find many later (with pagination)

  public static async Find(date: Date, targetCurrency: CurrencyCode): Promise<NType<MForex>> {
    const rawData: NType<DForex> = await prisma.forex.findFirst({
      select: queryObj,
      where: {
        date: {
          equals: dayjs(date).startOf('date').toDate(),
        },
        targetCurrency: {
          equals: targetCurrency,
        },
      },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return ForexTransformer.DMForexTransformer(rawData);
    }
  }

  public static async Create(date: Date, targetCurrency: string, rate: number): Promise<MForex> {
    const rawData = await prisma.forex.create({
      data: { date: dayjs(date).startOf('date').toDate(), rate, targetCurrency },
      select: queryObj,
    });

    return ForexTransformer.DMForexTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<MForex> {
    const rawData = await prisma.forex.delete({
      select: queryObj,
      where: { id },
    });

    return ForexTransformer.DMForexTransformer(rawData);
  }

  public static async Update(id: MForex['id'], date: Date, targetCurrency: string, rate: number): Promise<MForex> {
    const rawData = await prisma.forex.update({
      data: { date, rate, targetCurrency },
      select: queryObj,
      where: { id },
    });

    return ForexTransformer.DMForexTransformer(rawData);
  }
}
