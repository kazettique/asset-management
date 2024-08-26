import { db } from '@/lib/db';
import { BrandTransformer } from '@/transformer';
import { DBrand, Id, MBrand, NType, RBrand } from '@/types';

export abstract class CategoryRepository {
  public static async getAllCategory(): Promise<MBrand[]> {
    const rawData: DBrand[] = await db.brand.findMany({
      select: {
        comment: true,
        id: true,
        name: true,
      },
    });

    const parsedData = rawData.map((category) => BrandTransformer.DBrandTransformer(category));

    return parsedData;
  }

  public static async getCategory(id: Id): Promise<NType<MBrand>> {
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

  public static async createCategory(payload: RBrand): Promise<MBrand> {
    const rawData = await db.category.create({
      data: payload,
      select: {
        comment: true,
        id: true,
        name: true,
      },
    });

    return BrandTransformer.DBrandTransformer(rawData);
  }

  public static async deleteCategory(id: Id): Promise<MBrand> {
    const rawData = await db.category.delete({
      select: {
        comment: true,
        id: true,
        name: true,
      },
      where: { id },
    });

    return BrandTransformer.DBrandTransformer(rawData);
  }

  public static async updateCategory(payload: RBrand, id: MBrand['id']): Promise<MBrand> {
    const rawData = await db.category.update({
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
