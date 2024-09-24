import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/db';
import { DTag, Id, NString, NType } from '@/types';

const queryObj: Prisma.TagSelect = {
  comment: true,
  id: true,
  name: true,
};

const sortObj: Prisma.TagOrderByWithRelationInput[] = [{ name: Prisma.SortOrder.asc }];

export abstract class TagRepository {
  public static async FindAll(): Promise<DTag[]> {
    return await prisma.tag.findMany({
      select: queryObj,
    });
  }

  public static async Find(id: Id): Promise<NType<DTag>> {
    return await prisma.tag.findUnique({
      select: queryObj,
      where: { id },
    });
  }

  public static async FindMany(pageSize: number, skipCount: number): Promise<[number, DTag[]]> {
    return await prisma.$transaction([
      prisma.tag.count(),
      prisma.tag.findMany({
        orderBy: sortObj,
        select: queryObj,
        skip: skipCount,
        take: pageSize,
      }),
    ]);
  }

  public static async Create(name: string, comment: NString): Promise<DTag> {
    return await prisma.tag.create({
      data: { comment, name },
      select: queryObj,
    });
  }

  public static async Delete(id: Id): Promise<DTag> {
    return await prisma.tag.delete({
      select: queryObj,
      where: { id },
    });
  }

  public static async Update(id: DTag['id'], name: string, comment: NString): Promise<DTag> {
    return await prisma.tag.update({
      data: { comment, name },
      select: queryObj,
      where: { id },
    });
  }
}
