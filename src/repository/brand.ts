import { db } from '@/lib/db';
import { BrandTransformer } from '@/transformer';
import { DBrand, Id, MBrand, NType, RBrand } from '@/types';

export abstract class BrandRepository {
  public static async getAllBrand(): Promise<MBrand[]> {
    const rawData: DBrand[] = await db.brand.findMany({
      select: {
        comment: true,
        id: true,
        name: true,
      },
    });

    const parsedData = rawData.map((brand) => BrandTransformer.DBrandTransformer(brand));

    return parsedData;
  }

  public static async getBrand(id: Id): Promise<NType<MBrand>> {
    const rawData: NType<DBrand> = await db.brand.findUnique({
      select: {
        comment: true,
        id: true,
        name: true,
      },
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return BrandTransformer.DBrandTransformer(rawData);
    }
  }

  public static async createBrand(payload: RBrand): Promise<MBrand> {
    const rawData = await db.brand.create({
      data: payload,
      select: {
        comment: true,
        id: true,
        name: true,
      },
    });

    return BrandTransformer.DBrandTransformer(rawData);
  }

  public static async deleteBrand(id: Id): Promise<MBrand> {
    const rawData = await db.brand.delete({
      select: {
        comment: true,
        id: true,
        name: true,
      },
      where: { id },
    });

    return BrandTransformer.DBrandTransformer(rawData);
  }

  public static async updateBrand(payload: RBrand, id: MBrand['id']): Promise<MBrand> {
    const rawData = await db.brand.update({
      data: payload,
      select: {
        comment: true,
        id: true,
        name: true,
      },
      where: { id },
    });

    return BrandTransformer.DBrandTransformer(rawData);
  }
}
