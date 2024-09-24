import { Prisma } from '@prisma/client';

import { PlatformConstant } from '@/constant';
import { prisma } from '@/lib/db';
import { PlatformTransformer } from '@/transformer';
import { DPlatform, Id, MPlatform, NString, NType, PaginationBase } from '@/types';
import { Utils } from '@/utils';

const queryObj: Prisma.PlatformSelect = {
  comment: true,
  id: true,
  name: true,
};

const sortObj: Prisma.PlatformOrderByWithRelationInput[] = [{ name: Prisma.SortOrder.asc }];

export abstract class PlatformRepository {
  public static async FindAll(): Promise<MPlatform[]> {
    const rawData: DPlatform[] = await prisma.platform.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((Platform) => PlatformTransformer.DMPlatformTransformer(Platform));

    return parsedData;
  }

  public static async Find(id: Id): Promise<NType<MPlatform>> {
    const rawData: NType<DPlatform> = await prisma.platform.findUnique({
      select: queryObj,
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return PlatformTransformer.DMPlatformTransformer(rawData);
    }
  }

  public static async FindMany(page: number, pageSize: number): Promise<PaginationBase<MPlatform>> {
    const skipCount = Utils.CalculateSkipCount(page, pageSize);

    const raw = await prisma.$transaction([
      prisma.platform.count(),
      prisma.platform.findMany({
        orderBy: sortObj,
        select: queryObj,
        skip: skipCount,
        take: pageSize,
      }),
    ]);

    const [totalCount, rawData] = raw;
    const totalPage: number = Utils.CalculateTotalPage(totalCount, pageSize);

    const parsedData = rawData.map((quote) => PlatformTransformer.DMPlatformTransformer(quote));

    return { data: parsedData, page, totalCount, totalPage };
  }

  public static async Create(name: string, comment: NString): Promise<MPlatform> {
    const rawData = await prisma.platform.create({
      data: { comment, name },
      select: queryObj,
    });

    return PlatformTransformer.DMPlatformTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<MPlatform> {
    const transaction = await prisma.$transaction([
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

    return PlatformTransformer.DMPlatformTransformer(transaction[1]);
  }

  public static async Update(id: MPlatform['id'], name: string, comment: NString): Promise<MPlatform> {
    const rawData = await prisma.platform.update({
      data: { comment, name },
      select: queryObj,
      where: { id },
    });

    return PlatformTransformer.DMPlatformTransformer(rawData);
  }
}
