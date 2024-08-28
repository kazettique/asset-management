import { db } from '@/lib/db';
import { AssetTransformer } from '@/transformer';
import { DAsset, Id, MAsset, NType } from '@/types';

const queryObj = {
  brandId: true,
  comment: true,
  endCurrencyId: true,
  endDate: true,
  endMethodId: true,
  endPrice: true,
  id: true,
  isCensored: true,
  meta: true,
  name: true,
  startCurrencyId: true,
  startDate: true,
  startMethodId: true,
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

  // public static async test(): Promise<any> {
  //   const rawData = await db.asset.create({
  //     data: {
  //       brandId: 'f6543b54-2786-4cd6-aa47-11e49076211a',
  //       endCurrencyId: '717b5540-1332-46ff-8b7c-c8e0efbcddb5',
  //       endDate: new Date('2024-08-28'),
  //       endMethodId: '5fb5e604-750e-48fc-8070-2e56038c10c4',
  //       endPlaceId: '4f676996-de03-4c0e-9db6-213ab8623286',
  //       endPrice: 500,
  //       meta: { color: 'white' },
  //       name: { nameEn: 'AirPods Pro' },
  //       startCurrencyId: '717b5540-1332-46ff-8b7c-c8e0efbcddb5',
  //       startDate: new Date('2024-01-01'),
  //       startMethodId: '5d29df8e-7880-4879-a029-aefdb5b53cfe',
  //       startPlaceId: '4f676996-de03-4c0e-9db6-213ab8623286',
  //       startPrice: 1000,
  //     },
  //     select: queryObj,
  //   });

  //   return rawData;
  // }

  // public static async create(payload: AssetCommonTest): Promise<MAsset> {
  //   const rawData = await db.asset.create({
  //     data: { ...payload, brand: { name: 'aaa' }, startCurrencyId: '123', startMethodId: '123' },
  //     select: queryObj,
  //   });

  //   return AssetTransformer.DAssetTransformer(rawData);
  // }

  public static async delete(id: Id): Promise<MAsset> {
    const rawData = await db.asset.delete({
      select: queryObj,
      where: { id },
    });

    return AssetTransformer.DAssetTransformer(rawData);
  }

  // public static async update(payload: RAsset, id: MAsset['id']): Promise<MAsset> {
  //   const rawData = await db.asset.update({
  //     data: payload,
  //     select: queryObj,
  //     where: { id },
  //   });

  //   return AssetTransformer.DAssetTransformer(rawData);
  // }
}
