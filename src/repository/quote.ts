import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/db';
import { QuoteTransformer } from '@/transformer';
import { DQuote, Id, MQuote, NType } from '@/types';

const queryObj: Prisma.QuoteSelect = {
  author: true,
  id: true,
  quote: true,
};

export abstract class QuoteRepository {
  public static async FindAll(): Promise<MQuote[]> {
    const rawData: DQuote[] = await prisma.quote.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((quote) => QuoteTransformer.DMQuoteTransformer(quote));

    return parsedData;
  }

  public static async Find(id: Id): Promise<NType<MQuote>> {
    const rawData: NType<DQuote> = await prisma.quote.findUnique({
      select: queryObj,
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return QuoteTransformer.DMQuoteTransformer(rawData);
    }
  }

  // ref: https://github.com/prisma/prisma/discussions/5886
  // ref: https://stackoverflow.com/questions/249301/simple-random-samples-from-a-mysql-sql-database
  // ref: https://stackoverflow.com/questions/4329396/mysql-select-10-random-rows-from-600k-rows-fast
  public static async FindRandom(): Promise<NType<MQuote>> {
    const rawData: unknown = await prisma.$queryRaw`
      SELECT id, quote, author FROM quote ORDER BY RAND() LIMIT 1;
    `;

    const getFirst = Array.isArray(rawData) && rawData.length > 0 ? rawData[0] : null;

    if (getFirst === null) {
      return getFirst;
    } else {
      return QuoteTransformer.DMQuoteTransformer(getFirst as DQuote);
    }
  }

  public static async Create(quote: string, author: string): Promise<MQuote> {
    const rawData = await prisma.quote.create({
      data: { author, quote },
      select: queryObj,
    });

    return QuoteTransformer.DMQuoteTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<MQuote> {
    const rawData = await prisma.quote.delete({
      select: queryObj,
      where: { id },
    });

    return QuoteTransformer.DMQuoteTransformer(rawData);
  }

  public static async Update(id: MQuote['id'], quote: string, author: string): Promise<MQuote> {
    const rawData = await prisma.quote.update({
      data: { author, quote },
      select: queryObj,
      where: { id },
    });

    return QuoteTransformer.DMQuoteTransformer(rawData);
  }
}
