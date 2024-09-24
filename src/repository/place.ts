import { Prisma } from '@prisma/client';

import { PlaceConstant } from '@/constant';
import { prisma } from '@/lib/db';
import { DPlace, Id, NString, NType } from '@/types';

const queryObj: Prisma.PlaceSelect = {
  comment: true,
  id: true,
  name: true,
};

const sortObj: Prisma.PlaceOrderByWithRelationInput[] = [{ name: Prisma.SortOrder.asc }];

export abstract class PlaceRepository {
  public static async FindAll(): Promise<DPlace[]> {
    return await prisma.place.findMany({
      select: queryObj,
    });
  }

  public static async Find(id: Id): Promise<NType<DPlace>> {
    return await prisma.place.findUnique({
      select: queryObj,
      where: { id },
    });
  }

  public static async FindMany(pageSize: number, skipCount: number): Promise<[number, DPlace[]]> {
    return await prisma.$transaction([
      prisma.place.count(),
      prisma.place.findMany({
        orderBy: sortObj,
        select: queryObj,
        skip: skipCount,
        take: pageSize,
      }),
    ]);
  }

  public static async Create(name: string, comment: NString): Promise<DPlace> {
    return await prisma.place.create({
      data: { comment, name },
      select: queryObj,
    });
  }

  public static async Delete(id: Id): Promise<[Prisma.BatchPayload, DPlace]> {
    return await prisma.$transaction([
      prisma.asset.updateMany({
        data: {
          placeId: PlaceConstant.DEFAULT_PLACE.id,
        },
        where: {
          placeId: { equals: id },
        },
      }),
      prisma.place.delete({
        select: queryObj,
        where: { id },
      }),
    ]);
  }

  public static async Update(id: DPlace['id'], name: string, comment: NString): Promise<DPlace> {
    return await prisma.place.update({
      data: { comment, name },
      select: queryObj,
      where: { id },
    });
  }
}
