import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/db';
import { TagTransformer } from '@/transformer';
import { DTag, Id, MTag, NString, NType, PaginationBase } from '@/types';
import { Utils } from '@/utils';

const queryObj: Prisma.TagSelect = {
  comment: true,
  id: true,
  name: true,
};

const sortObj: Prisma.TagOrderByWithRelationInput[] = [{ name: Prisma.SortOrder.asc }];

export abstract class TagRepository {
  public static async FindAll(): Promise<MTag[]> {
    const rawData: DTag[] = await prisma.tag.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((place) => TagTransformer.DMTagTransformer(place));

    return parsedData;
  }

  public static async Find(id: Id): Promise<NType<MTag>> {
    const rawData: NType<DTag> = await prisma.tag.findUnique({
      select: queryObj,
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return TagTransformer.DMTagTransformer(rawData);
    }
  }

  public static async FindMany(page: number, pageSize: number): Promise<PaginationBase<MTag>> {
    const skipCount = Utils.CalculateSkipCount(page, pageSize);

    const raw = await prisma.$transaction([
      prisma.tag.count(),
      prisma.tag.findMany({
        orderBy: sortObj,
        select: queryObj,
        skip: skipCount,
        take: pageSize,
      }),
    ]);

    const [totalCount, rawData] = raw;
    const totalPage: number = Utils.CalculateTotalPage(totalCount, pageSize);

    const parsedData = rawData.map((tag) => TagTransformer.DMTagTransformer(tag));

    return { data: parsedData, page, totalCount, totalPage };
  }

  public static async Create(name: string, comment: NString): Promise<MTag> {
    const rawData = await prisma.tag.create({
      data: { comment, name },
      select: queryObj,
    });

    return TagTransformer.DMTagTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<MTag> {
    const rawData = await prisma.tag.delete({
      select: queryObj,
      where: { id },
    });

    return TagTransformer.DMTagTransformer(rawData);
  }

  public static async Update(id: MTag['id'], name: string, comment: NString): Promise<MTag> {
    const rawData = await prisma.tag.update({
      data: { comment, name },
      select: queryObj,
      where: { id },
    });

    return TagTransformer.DMTagTransformer(rawData);
  }
}
