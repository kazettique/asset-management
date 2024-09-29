import { Prisma } from '@prisma/client';

import { BrandConstant } from '@/constant';
import { prisma } from '@/lib/db';
import { DBrand, Id, NString, NType } from '@/types';

const queryObj: Prisma.BrandSelect = {
  comment: true,
  id: true,
  name: true,
};

const sortObj: Prisma.BrandOrderByWithRelationInput[] = [{ name: Prisma.SortOrder.asc }];

export abstract class BrandRepository {
  public static async FindAll(): Promise<DBrand[]> {
    return await prisma.brand.findMany({
      select: queryObj,
    });
  }

  public static async Find(id: Id): Promise<NType<DBrand>> {
    return await prisma.brand.findUnique({
      select: queryObj,
      where: { id },
    });
  }

  public static async FindMany(pageSize: number, skipCount: number): Promise<[number, DBrand[]]> {
    return await prisma.$transaction([
      prisma.brand.count(),
      prisma.brand.findMany({
        orderBy: sortObj,
        select: queryObj,
        skip: skipCount,
        take: pageSize,
      }),
    ]);
  }

  public static async Create(name: string, comment: NString): Promise<DBrand> {
    return await prisma.brand.create({
      data: { comment, name },
      select: queryObj,
    });
  }

  public static async Delete(id: Id): Promise<[Prisma.BatchPayload, DBrand]> {
    return await prisma.$transaction([
      prisma.asset.updateMany({
        data: {
          brandId: BrandConstant.DEFAULT_BRAND.id,
        },
        where: {
          brandId: { equals: id },
        },
      }),
      prisma.brand.delete({
        select: queryObj,
        where: { id },
      }),
    ]);
  }

  public static async Update(id: DBrand['id'], name: string, comment: NString): Promise<DBrand> {
    return await prisma.brand.update({
      data: { comment, name },
      select: queryObj,
      where: { id },
    });
  }
}
