import { db } from '@/lib/db';
import { BrandTransformer } from '@/transformer';
import { DBrand, Id, MBrand, NType, RBrand } from '@/types';

const queryObj = {
  comment: true,
  id: true,
  name: true,
};

export abstract class BrandRepository {
  public static async getAll(): Promise<MBrand[]> {
    const rawData: DBrand[] = await db.brand.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((brand) => BrandTransformer.DBrandTransformer(brand));

    return parsedData;
  }

  public static async get(id: Id): Promise<NType<MBrand>> {
    const rawData: NType<DBrand> = await db.brand.findUnique({
      select: queryObj,
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return BrandTransformer.DBrandTransformer(rawData);
    }
  }

  public static async create(payload: RBrand): Promise<MBrand> {
    const rawData = await db.brand.create({
      data: payload,
      select: queryObj,
    });

    return BrandTransformer.DBrandTransformer(rawData);
  }

  public static async delete(id: Id): Promise<MBrand> {
    const rawData = await db.brand.delete({
      select: queryObj,
      where: { id },
    });

    return BrandTransformer.DBrandTransformer(rawData);
  }

  public static async update(payload: RBrand, id: MBrand['id']): Promise<MBrand> {
    const rawData = await db.brand.update({
      data: payload,
      select: queryObj,
      where: { id },
    });

    return BrandTransformer.DBrandTransformer(rawData);
  }
}
