import { Prisma } from '@prisma/client';
import { CurrencyCode } from 'currency-codes-ts/dist/types';
import dayjs from 'dayjs';

import { prisma } from '@/lib/db';
import { DForex, Id, NType } from '@/types';

const queryObj: Prisma.ForexSelect = {
  date: true,
  id: true,
  rate: true,
  targetCurrency: true,
};

const sortObj: Prisma.ForexOrderByWithAggregationInput[] = [
  { date: Prisma.SortOrder.asc },
  { createdAt: Prisma.SortOrder.asc },
];

export abstract class ForexRepository {
  public static async FindAll(): Promise<DForex[]> {
    return await prisma.forex.findMany({
      select: queryObj,
    });
  }

  public static async FindMany(pageSize: number, skipCount: number): Promise<[number, DForex[]]> {
    return await prisma.$transaction([
      prisma.forex.count(),
      prisma.forex.findMany({
        orderBy: sortObj,
        select: queryObj,
        skip: skipCount,
        take: pageSize,
      }),
    ]);
  }

  public static async Find(date: Date, targetCurrency: CurrencyCode): Promise<NType<DForex>> {
    return await prisma.forex.findFirst({
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
  }

  public static async Create(date: Date, targetCurrency: string, rate: number): Promise<DForex> {
    return await prisma.forex.create({
      data: { date: dayjs(date).startOf('date').toDate(), rate, targetCurrency },
      select: queryObj,
    });
  }

  public static async Delete(id: Id): Promise<DForex> {
    return await prisma.forex.delete({
      select: queryObj,
      where: { id },
    });
  }

  public static async Update(id: DForex['id'], date: Date, targetCurrency: string, rate: number): Promise<DForex> {
    return await prisma.forex.update({
      data: { date, rate, targetCurrency },
      select: queryObj,
      where: { id },
    });
  }
}
