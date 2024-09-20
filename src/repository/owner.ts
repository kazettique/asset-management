import { Prisma } from '@prisma/client';

import { OwnerConstant } from '@/constant';
import { prisma } from '@/lib/db';
import { OwnerTransformer } from '@/transformer';
import { DOwner, Id, MOwner, NString, NType } from '@/types';

const queryObj: Prisma.OwnerSelect = {
  comment: true,
  id: true,
  name: true,
};

export abstract class OwnerRepository {
  public static async FindAll(): Promise<MOwner[]> {
    const rawData: DOwner[] = await prisma.owner.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((owner) => OwnerTransformer.DMOwnerTransformer(owner));

    return parsedData;
  }

  public static async Find(id: Id): Promise<NType<MOwner>> {
    const rawData: NType<DOwner> = await prisma.owner.findUnique({
      select: queryObj,
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return OwnerTransformer.DMOwnerTransformer(rawData);
    }
  }

  public static async Create(name: string, comment: NString): Promise<MOwner> {
    const rawData = await prisma.owner.create({
      data: { comment, name },
      select: queryObj,
    });

    return OwnerTransformer.DMOwnerTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<MOwner> {
    const transaction = await prisma.$transaction([
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

    return OwnerTransformer.DMOwnerTransformer(transaction[1]);
  }

  public static async Update(id: MOwner['id'], name: string, comment: NString): Promise<MOwner> {
    const rawData = await prisma.owner.update({
      data: { comment, name },
      select: queryObj,
      where: { id },
    });

    return OwnerTransformer.DMOwnerTransformer(rawData);
  }
}
