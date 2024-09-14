import { Prisma } from '@prisma/client';

import { CommonConstant } from '@/constant';
import { backendImplements } from '@/decorator';
import { db } from '@/lib/db';
import { AssetTransformer } from '@/transformer';
import { AssetLifeStatus, DAsset, Id, MAsset, NType, PaginationBase, PAsset, PAssetFind } from '@/types';
import { Utils } from '@/utils';

const queryObj: Prisma.AssetSelect = {
  brandId: true,
  categoryId: true,
  comment: true,
  endCurrencyId: true,
  endDate: true,
  endMethodId: true,
  endPlatformId: true,
  endPrice: true,
  id: true,
  isCensored: true,
  meta: true,
  name: true,
  ownerId: true,
  placeId: true,
  startCurrencyId: true,
  startDate: true,
  startMethodId: true,
  startPlatformId: true,
  startPrice: true,
  tags: { select: { id: true, name: true } },
};

@backendImplements()
export abstract class AssetRepository {
  public static async FindAll(): Promise<MAsset[]> {
    const rawData: DAsset[] = await db.asset.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((asset) => AssetTransformer.DMAssetTransformer(asset));

    return parsedData;
  }

  // ref: https://github.com/prisma/prisma/discussions/3087
  public static async FindMany({
    page = CommonConstant.DEFAULT_PAGE,
    pageSize = CommonConstant.DEFAULT_PAGE_SIZE,
    filters,
    sort,
  }: PAssetFind): Promise<PaginationBase<MAsset>> {
    const skipCount = Utils.CalculateSkipCount(page, pageSize);

    const {
      categories,
      brands,
      owners,
      endMethods,
      endDateRange,
      endPlatforms,
      endPriceRange,
      startDateRange,
      startMethods,
      startPlatforms,
      startPriceRange,
      places,
      lifeStatus,
    } = filters;

    const filterObj: Prisma.AssetWhereInput = {
      brandId: { in: brands },
      categoryId: { in: categories },
      endDate: {
        gte: endDateRange !== undefined && endDateRange[0] !== null ? endDateRange[0] : undefined,
        lte: endDateRange !== undefined && endDateRange[1] !== null ? endDateRange[1] : undefined,
      },
      endMethodId: { in: endMethods },
      endPlatformId: { in: endPlatforms },
      endPrice: {
        equals: lifeStatus === AssetLifeStatus.LIVE ? null : undefined,
        gte: endPriceRange !== undefined && endPriceRange[0] !== null ? endPriceRange[0] : undefined,
        lte: endPriceRange !== undefined && endPriceRange[1] !== null ? endPriceRange[1] : undefined,
        not: lifeStatus === AssetLifeStatus.DEAD ? null : undefined,
      },
      ownerId: { in: owners },
      placeId: { in: places },
      startDate: {
        gte: startDateRange !== undefined && startDateRange[0] !== null ? startDateRange[0] : undefined,
        lte: startDateRange !== undefined && startDateRange[1] !== null ? startDateRange[1] : undefined,
      },
      startMethodId: { in: startMethods },
      startPlatformId: { in: startPlatforms },
      startPrice: {
        gte: startPriceRange !== undefined && startPriceRange[0] !== null ? startPriceRange[0] : undefined,
        lte: startPriceRange !== undefined && startPriceRange[1] !== null ? startPriceRange[1] : undefined,
      },
    };

    const sortObj: Prisma.AssetOrderByWithRelationInput[] = [{ createdAt: Prisma.SortOrder.desc }];

    if (sort) {
      sortObj.unshift({ [sort.key]: sort.order });
    }

    const raw = await db.$transaction([
      db.asset.count({ where: filterObj }),
      db.asset.findMany({
        orderBy: sortObj,
        select: queryObj,
        skip: skipCount,
        take: pageSize,
        where: filterObj,
      }),
    ]);

    const [totalCount, rawData] = raw;
    const totalPage: number = Utils.CalculateTotalPage(totalCount, pageSize);

    const parsedData = rawData.map((asset) => AssetTransformer.DMAssetTransformer(asset));

    return { data: parsedData, page, totalCount, totalPage };
  }

  public static async Find(id: Id): Promise<NType<MAsset>> {
    const rawData: NType<DAsset> = await db.asset.findUnique({
      select: queryObj,
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return AssetTransformer.DMAssetTransformer(rawData);
    }
  }

  public static async Create(payload: PAsset): Promise<MAsset> {
    const rawData = await db.asset.create({
      data: payload,
      select: queryObj,
    });

    return AssetTransformer.DMAssetTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<MAsset> {
    const rawData = await db.asset.delete({
      select: queryObj,
      where: { id },
    });

    return AssetTransformer.DMAssetTransformer(rawData);
  }

  public static async Update(payload: PAsset, id: MAsset['id']): Promise<MAsset> {
    const rawData = await db.asset.update({
      data: payload,
      select: queryObj,
      where: { id },
    });

    return AssetTransformer.DMAssetTransformer(rawData);
  }
}
