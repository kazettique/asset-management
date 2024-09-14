import { db } from '@/lib/db';
import { CurrencyTransformer } from '@/transformer';
import { DCurrency, Id, MCurrency, NString, NType, PCurrency } from '@/types';

const queryObj = {
  comment: true,
  display: true,
  id: true,
  name: true,
  symbol: true,
};

export abstract class CurrencyRepository {
  public static async FindAll(): Promise<MCurrency[]> {
    const rawData: DCurrency[] = await db.currency.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((category) => CurrencyTransformer.DMCurrencyTransformer(category));

    return parsedData;
  }

  public static async Find(id: Id): Promise<NType<MCurrency>> {
    const rawData: NType<DCurrency> = await db.currency.findUnique({
      select: queryObj,
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return CurrencyTransformer.DMCurrencyTransformer(rawData);
    }
  }

  public static async Create(name: string, display: string, symbol: string, comment: NString): Promise<MCurrency> {
    const rawData = await db.currency.create({
      data: { comment, display, name, symbol },
      select: queryObj,
    });

    return CurrencyTransformer.DMCurrencyTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<MCurrency> {
    const rawData = await db.currency.delete({
      select: queryObj,
      where: { id },
    });

    return CurrencyTransformer.DMCurrencyTransformer(rawData);
  }

  public static async Update(
    id: MCurrency['id'],
    name: string,
    display: string,
    symbol: string,
    comment: NString,
  ): Promise<MCurrency> {
    const rawData = await db.currency.update({
      data: { comment, display, name, symbol },
      select: queryObj,
      where: { id },
    });

    return CurrencyTransformer.DMCurrencyTransformer(rawData);
  }
}
