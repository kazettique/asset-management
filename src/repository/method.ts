import { MethodType, Prisma } from '@prisma/client';

import { MethodConstant } from '@/constant';
import { prisma } from '@/lib/db';
import { MethodTransformer } from '@/transformer';
import { DMethod, Id, MMethod, NString, NType, PaginationBase } from '@/types';
import { Utils } from '@/utils';

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
  public static async FindAll(): Promise<MMethod[]> {
    const rawData: DMethod[] = await prisma.method.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((category) => MethodTransformer.DMMethodTransformer(category));

    return parsedData;
  }

  public static async Find(id: Id): Promise<NType<MMethod>> {
    const rawData: NType<DMethod> = await prisma.method.findUnique({
      select: queryObj,
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return MethodTransformer.DMMethodTransformer(rawData);
    }
  }

  public static async FindMany(page: number, pageSize: number): Promise<PaginationBase<MMethod>> {
    const skipCount = Utils.CalculateSkipCount(page, pageSize);

    const raw = await prisma.$transaction([
      prisma.method.count(),
      prisma.method.findMany({
        orderBy: sortObj,
        select: queryObj,
        skip: skipCount,
        take: pageSize,
      }),
    ]);

    const [totalCount, rawData] = raw;
    const totalPage: number = Utils.CalculateTotalPage(totalCount, pageSize);

    const parsedData = rawData.map((quote) => MethodTransformer.DMMethodTransformer(quote));

    return { data: parsedData, page, totalCount, totalPage };
  }

  public static async Create(name: string, type: MethodType, comment: NString): Promise<MMethod> {
    const rawData = await prisma.method.create({
      data: { comment, name, type },
      select: queryObj,
    });

    return MethodTransformer.DMMethodTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<MMethod> {
    const transaction = await prisma.$transaction([
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

    return MethodTransformer.DMMethodTransformer(transaction[1]);
  }

  public static async Update(id: MMethod['id'], name: string, type: MethodType, comment: NString): Promise<MMethod> {
    const rawData = await prisma.method.update({
      data: { comment, name, type },
      select: queryObj,
      where: { id },
    });

    return MethodTransformer.DMMethodTransformer(rawData);
  }
}
