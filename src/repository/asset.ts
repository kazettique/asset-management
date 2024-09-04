import { Prisma } from '@prisma/client';

import { backendImplements } from '@/decorator';
import { db } from '@/lib/db';
import { AssetTransformer } from '@/transformer';
import { DAsset, Id, MAsset, NType, PAsset } from '@/types';

const queryObj = {
  brandId: true,
  categoryId: true,
  comment: true,
  endCurrencyId: true,
  endDate: true,
  endMethodId: true,
  endPlatformId: true,
  endPrice: true,
  id: true,
  isCensored: true,
  meta: true,
  name: true,
  ownerId: true,
  placeId: true,
  startCurrencyId: true,
  startDate: true,
  startMethodId: true,
  startPlatformId: true,
  startPrice: true,
  tags: { select: { id: true, name: true } },
};

@backendImplements()
export abstract class AssetRepository {
  public static async FindAll(): Promise<MAsset[]> {
    const rawData: DAsset[] = await db.asset.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((asset) => AssetTransformer.DMAssetTransformer(asset));

    return parsedData;
  }

  public static async Find(id: Id): Promise<NType<MAsset>> {
    const rawData: NType<DAsset> = await db.asset.findUnique({
      select: queryObj,
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return AssetTransformer.DMAssetTransformer(rawData);
    }
  }

  public static async Create(payload: PAsset): Promise<MAsset> {
    const rawData = await db.asset.create({
      data: payload,
      select: queryObj,
    });

    return AssetTransformer.DMAssetTransformer(rawData);
  }

  public static async CreateMany(payload: PAsset[]): Promise<Prisma.BatchPayload> {
    const rawData = await db.asset.createMany({
      data: payload.map((item) => ({
        brandId: item.brandId,
        categoryId: item.categoryId,
        comment: item.comment,
        endCurrencyId: item.endCurrencyId,
        endDate: item.endDate,
        endMethodId: item.endMethodId,
        endPlatformId: item.endPlatformId,
        endPrice: item.endPrice,
        isCensored: item.isCensored,
        meta: item.meta,
        name: item.name,
        ownerId: item.ownerId,
        placeId: item.placeId,
        startCurrencyId: item.startCurrencyId,
        startDate: item.startDate,
        startMethodId: item.startMethodId,
        startPlatformId: item.startPlatformId,
        startPrice: item.startPrice,
      })),
    });

    return rawData;
  }

  public static async Delete(id: Id): Promise<MAsset> {
    const rawData = await db.asset.delete({
      select: queryObj,
      where: { id },
    });

    return AssetTransformer.DMAssetTransformer(rawData);
  }

  public static async Update(payload: PAsset, id: MAsset['id']): Promise<MAsset> {
    const rawData = await db.asset.update({
      data: payload,
      select: queryObj,
      where: { id },
    });

    return AssetTransformer.DMAssetTransformer(rawData);
  }
}
