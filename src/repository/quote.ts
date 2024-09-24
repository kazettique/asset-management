import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/db';
import { QuoteTransformer } from '@/transformer';
import { DQuote, Id, NType } from '@/types';

const queryObj: Prisma.QuoteSelect = {
  author: true,
  id: true,
  quote: true,
};

const sortObj: Prisma.QuoteOrderByWithRelationInput[] = [{ createdAt: Prisma.SortOrder.desc }];

export abstract class QuoteRepository {
  public static async FindAll(): Promise<DQuote[]> {
    return await prisma.quote.findMany({
      select: queryObj,
    });
  }

  public static async Find(id: Id): Promise<NType<DQuote>> {
    return await prisma.quote.findUnique({
      select: queryObj,
      where: { id },
    });
  }

  public static async FindMany(pageSize: number, skipCount: number): Promise<[number, DQuote[]]> {
    return await prisma.$transaction([
      prisma.quote.count(),
      prisma.quote.findMany({
        orderBy: sortObj,
        select: queryObj,
        skip: skipCount,
        take: pageSize,
      }),
    ]);
  }

  // ref: https://github.com/prisma/prisma/discussions/5886
  // ref: https://stackoverflow.com/questions/249301/simple-random-samples-from-a-mysql-sql-database
  // ref: https://stackoverflow.com/questions/4329396/mysql-select-10-random-rows-from-600k-rows-fast
  public static async FindRandom(): Promise<NType<DQuote>> {
    const rawData: unknown = await prisma.$queryRaw`
      SELECT id, quote, author FROM quote ORDER BY RAND() LIMIT 1;
    `;

    return Array.isArray(rawData) && rawData.length > 0 ? (rawData[0] as DQuote) : null;
  }

  public static async Create(quote: string, author: string): Promise<DQuote> {
    const rawData = await prisma.quote.create({
      data: { author, quote },
      select: queryObj,
    });

    return QuoteTransformer.DMQuoteTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<DQuote> {
    return await prisma.quote.delete({
      select: queryObj,
      where: { id },
    });
  }

  public static async Update(id: DQuote['id'], quote: string, author: string): Promise<DQuote> {
    return await prisma.quote.update({
      data: { author, quote },
      select: queryObj,
      where: { id },
    });
  }
}
