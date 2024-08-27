import { db } from '@/lib/db';
import { CurrencyTransformer } from '@/transformer';
import { DCurrency, Id, MCurrency, NType, RCurrency } from '@/types';

export abstract class CurrencyRepository {
  public static async getAll(): Promise<MCurrency[]> {
    const rawData: DCurrency[] = await db.currency.findMany({
      select: {
        comment: true,
        display: true,
        id: true,
        name: true,
        symbol: true,
      },
    });

    const parsedData = rawData.map((category) => CurrencyTransformer.DCurrencyTransformer(category));

    return parsedData;
  }

  public static async get(id: Id): Promise<NType<MCurrency>> {
    const rawData: NType<DCurrency> = await db.currency.findUnique({
      select: {
        comment: true,
        display: true,
        id: true,
        name: true,
        symbol: true,
      },
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return CurrencyTransformer.DCurrencyTransformer(rawData);
    }
  }

  public static async create(payload: RCurrency): Promise<MCurrency> {
    const rawData = await db.currency.create({
      data: payload,
      select: {
        comment: true,
        display: true,
        id: true,
        name: true,
        symbol: true,
      },
    });

    return CurrencyTransformer.DCurrencyTransformer(rawData);
  }

  public static async delete(id: Id): Promise<MCurrency> {
    const rawData = await db.currency.delete({
      select: {
        comment: true,
        display: true,
        id: true,
        name: true,
        symbol: true,
      },
      where: { id },
    });

    return CurrencyTransformer.DCurrencyTransformer(rawData);
  }

  public static async update(payload: RCurrency, id: MCurrency['id']): Promise<MCurrency> {
    const rawData = await db.currency.update({
      data: payload,
      select: {
        comment: true,
        display: true,
        id: true,
        name: true,
        symbol: true,
      },
      where: { id },
    });

    return CurrencyTransformer.DCurrencyTransformer(rawData);
  }
}
