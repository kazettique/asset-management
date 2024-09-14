import { db } from '@/lib/db';
import { BrandTransformer } from '@/transformer';
import { DBrand, Id, MBrand, NString, NType, PBrand } from '@/types';

const queryObj = {
  comment: true,
  id: true,
  name: true,
};

export abstract class BrandRepository {
  public static async FindAll(): Promise<MBrand[]> {
    const rawData: DBrand[] = await db.brand.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((brand) => BrandTransformer.DMBrandTransformer(brand));

    return parsedData;
  }

  public static async Find(id: Id): Promise<NType<MBrand>> {
    const rawData: NType<DBrand> = await db.brand.findUnique({
      select: queryObj,
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return BrandTransformer.DMBrandTransformer(rawData);
    }
  }

  public static async Create(name: string, comment: NString): Promise<MBrand> {
    const rawData = await db.brand.create({
      data: { comment, name },
      select: queryObj,
    });

    return BrandTransformer.DMBrandTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<MBrand> {
    const rawData = await db.brand.delete({
      select: queryObj,
      where: { id },
    });

    return BrandTransformer.DMBrandTransformer(rawData);
  }

  public static async Update(id: MBrand['id'], name: string, comment: NString): Promise<MBrand> {
    const rawData = await db.brand.update({
      data: { comment, name },
      select: queryObj,
      where: { id },
    });

    return BrandTransformer.DMBrandTransformer(rawData);
  }
}
