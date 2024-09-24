import { Prisma } from '@prisma/client';

import { PlaceConstant } from '@/constant';
import { prisma } from '@/lib/db';
import { PlaceTransformer } from '@/transformer';
import { DPlace, Id, MPlace, NString, NType, PaginationBase } from '@/types';
import { Utils } from '@/utils';

const queryObj: Prisma.PlaceSelect = {
  comment: true,
  id: true,
  name: true,
};

const sortObj: Prisma.PlaceOrderByWithRelationInput[] = [{ name: Prisma.SortOrder.asc }];

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

  public static async FindMany(page: number, pageSize: number): Promise<PaginationBase<MPlace>> {
    const skipCount = Utils.CalculateSkipCount(page, pageSize);

    const raw = await prisma.$transaction([
      prisma.place.count(),
      prisma.place.findMany({
        orderBy: sortObj,
        select: queryObj,
        skip: skipCount,
        take: pageSize,
      }),
    ]);

    const [totalCount, rawData] = raw;
    const totalPage: number = Utils.CalculateTotalPage(totalCount, pageSize);

    const parsedData = rawData.map((quote) => PlaceTransformer.DMPlaceTransformer(quote));

    return { data: parsedData, page, totalCount, totalPage };
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
