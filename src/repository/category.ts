import { Prisma } from '@prisma/client';

import { CategoryConstant } from '@/constant';
import { prisma } from '@/lib/db';
import { CategoryTransformer } from '@/transformer';
import { DCategory, Id, MCategory, NString, NType } from '@/types';

const queryObj: Prisma.CategorySelect = {
  comment: true,
  id: true,
  name: true,
};

export abstract class CategoryRepository {
  public static async FindAll(): Promise<MCategory[]> {
    const rawData: DCategory[] = await prisma.category.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((category) => CategoryTransformer.DMCategoryTransformer(category));

    return parsedData;
  }

  public static async Find(id: Id): Promise<NType<MCategory>> {
    const rawData: NType<DCategory> = await prisma.category.findUnique({
      select: queryObj,
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return CategoryTransformer.DMCategoryTransformer(rawData);
    }
  }

  public static async Create(name: string, comment: NString): Promise<MCategory> {
    const rawData = await prisma.category.create({
      data: { comment, name },
      select: queryObj,
    });

    return CategoryTransformer.DMCategoryTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<MCategory> {
    const transaction = await prisma.$transaction([
      prisma.asset.updateMany({
        data: {
          categoryId: CategoryConstant.DEFAULT_CATEGORY.id,
        },
        where: {
          categoryId: { equals: id },
        },
      }),
      prisma.category.delete({
        select: queryObj,
        where: { id },
      }),
    ]);

    return CategoryTransformer.DMCategoryTransformer(transaction[1]);
  }

  public static async Update(id: MCategory['id'], name: string, comment: NString): Promise<MCategory> {
    const rawData = await prisma.category.update({
      data: { comment, name },
      select: queryObj,
      where: { id },
    });

    return CategoryTransformer.DMCategoryTransformer(rawData);
  }
}
