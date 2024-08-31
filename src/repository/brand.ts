import { backendImplements } from '@/decorator';
import { db } from '@/lib/db';
import { BrandTransformer } from '@/transformer';
import { DBrand, Id, MBrand, NType, PBrand } from '@/types';

const queryObj = {
  comment: true,
  id: true,
  name: true,
};

@backendImplements()
export abstract class BrandRepository {
  public static async FindAll(): Promise<MBrand[]> {
    const rawData: DBrand[] = await db.brand.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((brand) => BrandTransformer.DBrandTransformer(brand));

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
      return BrandTransformer.DBrandTransformer(rawData);
    }
  }

  public static async Create(payload: PBrand): Promise<MBrand> {
    const rawData = await db.brand.create({
      data: payload,
      select: queryObj,
    });

    return BrandTransformer.DBrandTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<MBrand> {
    const rawData = await db.brand.delete({
      select: queryObj,
      where: { id },
    });

    return BrandTransformer.DBrandTransformer(rawData);
  }

  public static async Update(payload: PBrand, id: MBrand['id']): Promise<MBrand> {
    const rawData = await db.brand.update({
      data: payload,
      select: queryObj,
      where: { id },
    });

    return BrandTransformer.DBrandTransformer(rawData);
  }
}
