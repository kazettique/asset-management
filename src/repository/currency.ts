import { backendImplements } from '@/decorator';
import { db } from '@/lib/db';
import { CurrencyTransformer } from '@/transformer';
import { DCurrency, Id, MCurrency, NType, RCurrency } from '@/types';

const queryObj = {
  comment: true,
  display: true,
  id: true,
  name: true,
  symbol: true,
};

@backendImplements()
export abstract class CurrencyRepository {
  public static async FindAll(): Promise<MCurrency[]> {
    const rawData: DCurrency[] = await db.currency.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((category) => CurrencyTransformer.DCurrencyTransformer(category));

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
      return CurrencyTransformer.DCurrencyTransformer(rawData);
    }
  }

  public static async Create(payload: RCurrency): Promise<MCurrency> {
    const rawData = await db.currency.create({
      data: payload,
      select: queryObj,
    });

    return CurrencyTransformer.DCurrencyTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<MCurrency> {
    const rawData = await db.currency.delete({
      select: queryObj,
      where: { id },
    });

    return CurrencyTransformer.DCurrencyTransformer(rawData);
  }

  public static async Update(payload: RCurrency, id: MCurrency['id']): Promise<MCurrency> {
    const rawData = await db.currency.update({
      data: payload,
      select: queryObj,
      where: { id },
    });

    return CurrencyTransformer.DCurrencyTransformer(rawData);
  }
}
