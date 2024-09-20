import { Prisma } from '@prisma/client';

import { PlaceConstant } from '@/constant';
import { prisma } from '@/lib/db';
import { PlaceTransformer } from '@/transformer';
import { DPlace, Id, MPlace, NString, NType } from '@/types';

const queryObj: Prisma.PlaceSelect = {
  comment: true,
  id: true,
  name: true,
};

export abstract class PlaceRepository {
  public static async FindAll(): Promise<MPlace[]> {
    const rawData: DPlace[] = await prisma.place.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((place) => PlaceTransformer.DMPlaceTransformer(place));

    return parsedData;
  }

  public static async Find(id: Id): Promise<NType<MPlace>> {
    const rawData: NType<DPlace> = await prisma.place.findUnique({
      select: queryObj,
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return PlaceTransformer.DMPlaceTransformer(rawData);
    }
  }

  public static async Create(name: string, comment: NString): Promise<MPlace> {
    const rawData = await prisma.place.create({
      data: { comment, name },
      select: queryObj,
    });

    return PlaceTransformer.DMPlaceTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<MPlace> {
    const transaction = await prisma.$transaction([
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

    return PlaceTransformer.DMPlaceTransformer(transaction[1]);
  }

  public static async Update(id: MPlace['id'], name: string, comment: NString): Promise<MPlace> {
    const rawData = await prisma.place.update({
      data: { comment, name },
      select: queryObj,
      where: { id },
    });

    return PlaceTransformer.DMPlaceTransformer(rawData);
  }
}
