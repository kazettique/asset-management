import { Prisma } from '@prisma/client';

import { OwnerConstant } from '@/constant';
import { prisma } from '@/lib/db';
import { DOwner, Id, NString, NType } from '@/types';

const queryObj: Prisma.OwnerSelect = {
  comment: true,
  id: true,
  name: true,
};

const sortObj: Prisma.OwnerOrderByWithRelationInput[] = [{ name: Prisma.SortOrder.asc }];

export abstract class OwnerRepository {
  public static async FindAll(): Promise<DOwner[]> {
    return await prisma.owner.findMany({
      select: queryObj,
    });
  }

  public static async Find(id: Id): Promise<NType<DOwner>> {
    return await prisma.owner.findUnique({
      select: queryObj,
      where: { id },
    });
  }

  public static async FindMany(pageSize: number, skipCount: number): Promise<[number, DOwner[]]> {
    return await prisma.$transaction([
      prisma.owner.count(),
      prisma.owner.findMany({
        orderBy: sortObj,
        select: queryObj,
        skip: skipCount,
        take: pageSize,
      }),
    ]);
  }

  public static async Create(name: string, comment: NString): Promise<DOwner> {
    return await prisma.owner.create({
      data: { comment, name },
      select: queryObj,
    });
  }

  public static async Delete(id: Id): Promise<[Prisma.BatchPayload, DOwner]> {
    return await prisma.$transaction([
      prisma.asset.updateMany({
        data: {
          ownerId: OwnerConstant.DEFAULT_OWNER.id,
        },
        where: {
          ownerId: { equals: id },
        },
      }),
      prisma.owner.delete({
        select: queryObj,
        where: { id },
      }),
    ]);
  }

  public static async Update(id: DOwner['id'], name: string, comment: NString): Promise<DOwner> {
    return await prisma.owner.update({
      data: { comment, name },
      select: queryObj,
      where: { id },
    });
  }
}
