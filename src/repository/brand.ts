import { Prisma } from '@prisma/client';

import { BrandConstant } from '@/constant';
import { prisma } from '@/lib/db';
import { BrandTransformer } from '@/transformer';
import { DBrand, Id, MBrand, NString, NType } from '@/types';

const queryObj: Prisma.BrandSelect = {
  comment: true,
  id: true,
  name: true,
};

export abstract class BrandRepository {
  public static async FindAll(): Promise<MBrand[]> {
    const rawData: DBrand[] = await prisma.brand.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((brand) => BrandTransformer.DMBrandTransformer(brand));

    return parsedData;
  }

  public static async Find(id: Id): Promise<NType<MBrand>> {
    const rawData: NType<DBrand> = await prisma.brand.findUnique({
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
    const rawData = await prisma.brand.create({
      data: { comment, name },
      select: queryObj,
    });

    return BrandTransformer.DMBrandTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<MBrand> {
    const transaction = await prisma.$transaction([
      prisma.asset.updateMany({
        data: {
          brandId: BrandConstant.BRAND_DEFAULT.id,
        },
        where: {
          brandId: { equals: id },
        },
      }),
      prisma.brand.delete({
        select: queryObj,
        where: { id },
      }),
    ]);

    return BrandTransformer.DMBrandTransformer(transaction[1]);
  }

  public static async Update(id: MBrand['id'], name: string, comment: NString): Promise<MBrand> {
    const rawData = await prisma.brand.update({
      data: { comment, name },
      select: queryObj,
      where: { id },
    });

    return BrandTransformer.DMBrandTransformer(rawData);
  }
}
