import { MethodType, Prisma } from '@prisma/client';

import { MethodConstant } from '@/constant';
import { prisma } from '@/lib/db';
import { DMethod, Id, NString, NType } from '@/types';

const queryObj: Prisma.MethodSelect = {
  comment: true,
  id: true,
  name: true,
  type: true,
};

const sortObj: Prisma.MethodOrderByWithRelationInput[] = [
  { type: Prisma.SortOrder.asc },
  { name: Prisma.SortOrder.asc },
];

export abstract class MethodRepository {
  public static async FindAll(): Promise<DMethod[]> {
    return await prisma.method.findMany({
      select: queryObj,
    });
  }

  public static async Find(id: Id): Promise<NType<DMethod>> {
    return await prisma.method.findUnique({
      select: queryObj,
      where: { id },
    });
  }

  public static async FindMany(pageSize: number, skipCount: number): Promise<[number, DMethod[]]> {
    return await prisma.$transaction([
      prisma.method.count(),
      prisma.method.findMany({
        orderBy: sortObj,
        select: queryObj,
        skip: skipCount,
        take: pageSize,
      }),
    ]);
  }

  public static async Create(name: string, type: MethodType, comment: NString): Promise<DMethod> {
    return await prisma.method.create({
      data: { comment, name, type },
      select: queryObj,
    });
  }

  public static async Delete(id: Id): Promise<[Prisma.BatchPayload, DMethod]> {
    return await prisma.$transaction([
      prisma.asset.updateMany({
        data: {
          endMethodId: MethodConstant.DEFAULT_METHOD.id,
          startMethodId: MethodConstant.DEFAULT_METHOD.id,
        },
        where: {
          endMethodId: { equals: id },
          startMethodId: { equals: id },
        },
      }),
      prisma.method.delete({
        select: queryObj,
        where: { id },
      }),
    ]);
  }

  public static async Update(id: DMethod['id'], name: string, type: MethodType, comment: NString): Promise<DMethod> {
    return await prisma.method.update({
      data: { comment, name, type },
      select: queryObj,
      where: { id },
    });
  }
}
