import { Prisma } from '@prisma/client';

import { db } from '@/lib/db';
import { AssetTransformer } from '@/transformer';
import { DAsset, Id, MAsset, NType, RAsset } from '@/types';

const queryObj = {
  brandId: true,
  categoryId: true,
  comment: true,
  endCurrencyId: true,
  endDate: true,
  endMethodId: true,
  endPlaceId: true,
  endPrice: true,
  id: true,
  isCensored: true,
  meta: true,
  name: true,
  startCurrencyId: true,
  startDate: true,
  startMethodId: true,
  startPlaceId: true,
  startPrice: true,
};

export abstract class AssetRepository {
  public static async getAll(): Promise<MAsset[]> {
    const rawData: DAsset[] = await db.asset.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((asset) => AssetTransformer.DAssetTransformer(asset));

    return parsedData;
  }

  public static async get(id: Id): Promise<NType<MAsset>> {
    const rawData: NType<DAsset> = await db.asset.findUnique({
      select: queryObj,
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return AssetTransformer.DAssetTransformer(rawData);
    }
  }

  public static async create(payload: RAsset): Promise<MAsset> {
    const rawData = await db.asset.create({
      data: { ...payload, meta: payload.meta as Prisma.JsonObject, name: payload.name as unknown as Prisma.JsonObject },
      select: queryObj,
    });

    return AssetTransformer.DAssetTransformer(rawData);
  }

  public static async delete(id: Id): Promise<MAsset> {
    const rawData = await db.asset.delete({
      select: queryObj,
      where: { id },
    });

    return AssetTransformer.DAssetTransformer(rawData);
  }

  public static async update(payload: RAsset, id: MAsset['id']): Promise<MAsset> {
    const rawData = await db.asset.update({
      data: { ...payload, meta: payload.meta as Prisma.JsonObject, name: payload.name as unknown as Prisma.JsonObject },
      select: queryObj,
      where: { id },
    });

    return AssetTransformer.DAssetTransformer(rawData);
  }
}
