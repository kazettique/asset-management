import { backendImplements } from '@/decorator';
import { db } from '@/lib/db';
import { CategoryTransformer } from '@/transformer';
import { DCategory, Id, MCategory, NType, PCategory } from '@/types';

const queryObj = {
  comment: true,
  id: true,
  name: true,
};

@backendImplements()
export abstract class CategoryRepository {
  public static async FindAll(): Promise<MCategory[]> {
    const rawData: DCategory[] = await db.category.findMany({
      select: queryObj,
    });

    // console.log('rawData', rawData);

    const parsedData = rawData.map((category) => CategoryTransformer.DMCategoryTransformer(category));

    return parsedData;
  }

  public static async Find(id: Id): Promise<NType<MCategory>> {
    const rawData: NType<DCategory> = await db.category.findUnique({
      select: queryObj,
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return CategoryTransformer.DMCategoryTransformer(rawData);
    }
  }

  public static async Create(payload: PCategory): Promise<MCategory> {
    const rawData = await db.category.create({
      data: payload,
      select: queryObj,
    });

    return CategoryTransformer.DMCategoryTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<MCategory> {
    const rawData = await db.category.delete({
      select: queryObj,
      where: { id },
    });

    return CategoryTransformer.DMCategoryTransformer(rawData);
  }

  public static async Update(payload: PCategory, id: MCategory['id']): Promise<MCategory> {
    const rawData = await db.category.update({
      data: payload,
      select: queryObj,
      where: { id },
    });

    return CategoryTransformer.DMCategoryTransformer(rawData);
  }
}
