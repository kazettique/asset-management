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
  public static async FindRandom(): Promise<MQuote> {
    // const rawData: unknown = await prisma.$queryRaw`
    //   SELECT * FROM quote ORDER BY RANDOM() LIMIT 1
    // `;

    const rawData2: unknown = await prisma.$queryRaw`
      SELECT * FROM quote WHERE 0.01 >= RAND()
    `;

    return QuoteTransformer.DMQuoteTransformer(rawData2 as DQuote);
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
