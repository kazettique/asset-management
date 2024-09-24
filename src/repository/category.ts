import { Prisma } from '@prisma/client';

import { CategoryConstant } from '@/constant';
import { prisma } from '@/lib/db';
import { DCategory, Id, NString, NType } from '@/types';

const queryObj: Prisma.CategorySelect = {
  comment: true,
  id: true,
  name: true,
};

const sortObj: Prisma.CategoryOrderByWithRelationInput[] = [{ name: Prisma.SortOrder.asc }];

export abstract class CategoryRepository {
  public static async FindAll(): Promise<DCategory[]> {
    return await prisma.category.findMany({
      select: queryObj,
    });
  }

  public static async Find(id: Id): Promise<NType<DCategory>> {
    return await prisma.category.findUnique({
      select: queryObj,
      where: { id },
    });
  }

  public static async FindMany(pageSize: number, skipCount: number): Promise<[number, DCategory[]]> {
    return await prisma.$transaction([
      prisma.category.count(),
      prisma.category.findMany({
        orderBy: sortObj,
        select: queryObj,
        skip: skipCount,
        take: pageSize,
      }),
    ]);
  }

  public static async Create(name: string, comment: NString): Promise<DCategory> {
    return await prisma.category.create({
      data: { comment, name },
      select: queryObj,
    });
  }

  public static async Delete(id: Id): Promise<[Prisma.BatchPayload, DCategory]> {
    return await prisma.$transaction([
      prisma.asset.updateMany({
        data: {
          categoryId: CategoryConstant.DEFAULT_CATEGORY.id,
        },
        where: {
          categoryId: { equals: id },
        },
      }),
      prisma.category.delete({
        select: queryObj,
        where: { id },
      }),
    ]);
  }

  public static async Update(id: DCategory['id'], name: string, comment: NString): Promise<DCategory> {
    return await prisma.category.update({
      data: { comment, name },
      select: queryObj,
      where: { id },
    });
  }
}
