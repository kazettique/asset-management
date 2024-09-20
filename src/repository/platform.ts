import { Prisma } from '@prisma/client';

import { PlatformConstant } from '@/constant';
import { prisma } from '@/lib/db';
import { PlatformTransformer } from '@/transformer';
import { DPlatform, Id, MPlatform, NString, NType } from '@/types';

const queryObj: Prisma.PlatformSelect = {
  comment: true,
  id: true,
  name: true,
};

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
