import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/db';
import { DOwnershipHistory, Id } from '@/types';

const queryObj: Prisma.OwnershipHistorySelect = {
  asset: {
    select: { id: true, name: true },
  },
  owner: {
    select: { id: true, name: true },
  },
};

export abstract class OwnershipHistoryRepository {
  public static async FindAll(): Promise<DOwnershipHistory[]> {
    return await prisma.ownershipHistory.findMany({
      select: queryObj,
    });
  }

  public static async FindMany(assetIds: Id[], ownerIds: Id[]): Promise<DOwnershipHistory[]> {
    const filterObj: Prisma.OwnershipHistoryWhereInput = {
      assetId: { in: assetIds },
      ownerId: { in: ownerIds },
    };

    const sortObj: Prisma.OwnershipHistoryOrderByWithRelationInput[] = [{ startDate: Prisma.SortOrder.asc }];

    return await prisma.ownershipHistory.findMany({
      orderBy: sortObj,
      select: queryObj,
      where: filterObj,
    });
  }

  public static async Create(assetId: Id, ownerId: Id, startDate: Date): Promise<DOwnershipHistory> {
    return await prisma.ownershipHistory.create({
      data: { assetId, ownerId, startDate },
      select: queryObj,
    });
  }
}
