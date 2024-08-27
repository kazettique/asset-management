import { db } from '@/lib/db';
import { CategoryTransformer } from '@/transformer';
import { DCategory, Id, MCategory, NType, RCategory } from '@/types';

export abstract class CategoryRepository {
  public static async getAll(): Promise<MCategory[]> {
    const rawData: DCategory[] = await db.category.findMany({
      select: {
        comment: true,
        id: true,
        name: true,
      },
    });

    const parsedData = rawData.map((category) => CategoryTransformer.DCategoryTransformer(category));

    return parsedData;
  }

  public static async get(id: Id): Promise<NType<MCategory>> {
    const rawData: NType<DCategory> = await db.category.findUnique({
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
      return CategoryTransformer.DCategoryTransformer(rawData);
    }
  }

  public static async create(payload: RCategory): Promise<MCategory> {
    const rawData = await db.category.create({
      data: payload,
      select: {
        comment: true,
        id: true,
        name: true,
      },
    });

    return CategoryTransformer.DCategoryTransformer(rawData);
  }

  public static async delete(id: Id): Promise<MCategory> {
    const rawData = await db.category.delete({
      select: {
        comment: true,
        id: true,
        name: true,
      },
      where: { id },
    });

    return CategoryTransformer.DCategoryTransformer(rawData);
  }

  public static async update(payload: RCategory, id: MCategory['id']): Promise<MCategory> {
    const rawData = await db.category.update({
      data: payload,
      select: {
        comment: true,
        id: true,
        name: true,
      },
      where: { id },
    });

    return CategoryTransformer.DCategoryTransformer(rawData);
  }
}
