import { Prisma } from '@prisma/client';

import { PlatformConstant } from '@/constant';
import { prisma } from '@/lib/db';
import { DPlatform, Id, NString, NType } from '@/types';

const queryObj: Prisma.PlatformSelect = {
  comment: true,
  id: true,
  name: true,
};

const sortObj: Prisma.PlatformOrderByWithRelationInput[] = [{ name: Prisma.SortOrder.asc }];

export abstract class PlatformRepository {
  public static async FindAll(): Promise<DPlatform[]> {
    return await prisma.platform.findMany({
      select: queryObj,
    });
  }

  public static async Find(id: Id): Promise<NType<DPlatform>> {
    return await prisma.platform.findUnique({
      select: queryObj,
      where: { id },
    });
  }

  public static async FindMany(pageSize: number, skipCount: number): Promise<[number, DPlatform[]]> {
    return await prisma.$transaction([
      prisma.platform.count(),
      prisma.platform.findMany({
        orderBy: sortObj,
        select: queryObj,
        skip: skipCount,
        take: pageSize,
      }),
    ]);
  }

  public static async Create(name: string, comment: NString): Promise<DPlatform> {
    return await prisma.platform.create({
      data: { comment, name },
      select: queryObj,
    });
  }

  public static async Delete(id: Id): Promise<[Prisma.BatchPayload, DPlatform]> {
    return await prisma.$transaction([
      prisma.asset.updateMany({
        data: {
          endPlatformId: PlatformConstant.DEFAULT_PLATFORM.id,
          startPlatformId: PlatformConstant.DEFAULT_PLATFORM.id,
        },
        where: {
          endPlatformId: { equals: id },
          startPlatformId: { equals: id },
        },
      }),
      prisma.platform.delete({
        select: queryObj,
        where: { id },
      }),
    ]);
  }

  public static async Update(id: DPlatform['id'], name: string, comment: NString): Promise<DPlatform> {
    return await prisma.platform.update({
      data: { comment, name },
      select: queryObj,
      where: { id },
    });
  }
}
