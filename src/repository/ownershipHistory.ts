import { Prisma } from '@prisma/client';

import { db } from '@/lib/db';
import { OwnershipHistoryTransformer } from '@/transformer';
import { DOwnershipHistory, Id, MOwnershipHistory } from '@/types';

const queryObj: Prisma.OwnershipHistorySelect = {
  asset: {
    select: { id: true, name: true },
  },
  owner: {
    select: { id: true, name: true },
  },
};

export abstract class OwnershipHistoryRepository {
  public static async FindAll(): Promise<MOwnershipHistory[]> {
    const rawData: DOwnershipHistory[] = await db.ownershipHistory.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((place) => OwnershipHistoryTransformer.DMOwnershipHistoryTransformer(place));

    return parsedData;
  }

  public static async FindMany(assetIds: Id[], ownerIds: Id[]): Promise<MOwnershipHistory[]> {
    const filterObj: Prisma.OwnershipHistoryWhereInput = {
      assetId: { in: assetIds },
      ownerId: { in: ownerIds },
    };

    const sortObj: Prisma.OwnershipHistoryOrderByWithRelationInput[] = [{ startDate: Prisma.SortOrder.asc }];

    const rawData: DOwnershipHistory[] = await db.ownershipHistory.findMany({
      orderBy: sortObj,
      select: queryObj,
      where: filterObj,
    });

    const parsedData = rawData.map((place) => OwnershipHistoryTransformer.DMOwnershipHistoryTransformer(place));

    return parsedData;
  }

  public static async Create(assetId: Id, ownerId: Id, startDate: Date): Promise<MOwnershipHistory> {
    const rawData = await db.ownershipHistory.create({
      data: { assetId, ownerId, startDate },
      select: queryObj,
    });

    return OwnershipHistoryTransformer.DMOwnershipHistoryTransformer(rawData);
  }
}
