import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';

import { CommonConstant } from '@/constant';
import { db } from '@/lib/db';
import { AssetTransformer, DashboardTransformer } from '@/transformer';
import {
  AssetLifeStatus,
  AssetMeta,
  DAsset,
  DAssetOwnership,
  DDashboardAggregate,
  DTag,
  Id,
  MAsset,
  MAssetOwnership,
  MDashboardAggregate,
  Name,
  NString,
  NType,
  PaginationBase,
  PAssetFind,
  Price,
} from '@/types';
import { Utils } from '@/utils';

const queryObj: Prisma.AssetSelect = {
  brand: {
    select: { id: true, name: true },
  },
  category: {
    select: { id: true, name: true },
  },
  comment: true,
  endDate: true,
  endForex: { select: { rate: true, targetCurrency: true } },
  endMethod: {
    select: { id: true, name: true },
  },
  endPlatform: {
    select: { id: true, name: true },
  },
  endPrice: true,
  id: true,
  isCensored: true,
  meta: true,
  name: true,
  owner: {
    select: { id: true, name: true },
  },
  place: {
    select: { id: true, name: true },
  },
  startDate: true,
  startForex: { select: { rate: true, targetCurrency: true } },
  startMethod: {
    select: { id: true, name: true },
  },
  startPlatform: {
    select: { id: true, name: true },
  },
  startPrice: true,
  tags: { select: { id: true, name: true } },
};

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

  public static async FindOwnership(id: Id): Promise<NType<MAssetOwnership>> {
    const rawData: NType<DAssetOwnership> = await db.asset.findUnique({
      select: { id: true, ownerId: true },
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return AssetTransformer.DMAssetOwnershipTransformer(rawData);
    }
  }

  public static async Create(
    brandId: NType<Id>,
    categoryId: NType<Id>,
    comment: NString,
    endDate: NType<Date>,
    endForexId: NType<Id>,
    endMethodId: NType<Id>,
    endPlatformId: NType<Id>,
    endPrice: NType<Price>,
    isCensored: boolean,
    meta: AssetMeta,
    name: Name,
    ownerId: NType<Id>,
    placeId: NType<Id>,
    startDate: NType<Date>,
    startForexId: NType<Id>,
    startMethodId: NType<Id>,
    startPlatformId: NType<Id>,
    startPrice: NType<Price>,
    tags: {
      connect: Pick<DTag, 'id'>[];
      create: { name: string }[];
    },
  ): Promise<MAsset> {
    const rawData = await db.asset.create({
      data: {
        brandId,
        categoryId,
        comment,
        endDate,
        endForexId,
        endMethodId,
        endPlatformId,
        endPrice,
        isCensored,
        meta,
        name,
        ownerId,
        placeId,
        startDate,
        startForexId,
        startMethodId,
        startPlatformId,
        startPrice,
        tags,
      },
      select: queryObj,
    });

    return AssetTransformer.DMAssetTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<MAsset> {
    const transaction = await db.$transaction([
      db.ownershipHistory.deleteMany({
        where: { assetId: id },
      }),
      db.asset.delete({
        select: queryObj,
        where: { id },
      }),
    ]);

    return AssetTransformer.DMAssetTransformer(transaction[1]);
  }

  public static async Update(
    id: MAsset['id'],
    brandId: NType<Id>,
    categoryId: NType<Id>,
    comment: NString,
    endDate: NType<Date>,
    endForexId: NType<Id>,
    endMethodId: NType<Id>,
    endPlatformId: NType<Id>,
    endPrice: NType<Price>,
    isCensored: boolean,
    meta: AssetMeta,
    name: Name,
    ownerId: NType<Id>,
    placeId: NType<Id>,
    startDate: NType<Date>,
    startForexId: NType<Id>,
    startMethodId: NType<Id>,
    startPlatformId: NType<Id>,
    startPrice: NType<Price>,
    tags: {
      connect: Pick<DTag, 'id'>[];
      create: { name: string }[];
    },
  ): Promise<MAsset> {
    const rawData = await db.asset.update({
      data: {
        brandId,
        categoryId,
        comment,
        endDate,
        endForexId,
        endMethodId,
        endPlatformId,
        endPrice,
        isCensored,
        meta,
        name,
        ownerId,
        placeId,
        startDate,
        startForexId,
        startMethodId,
        startPlatformId,
        startPrice,
        tags,
      },
      select: queryObj,
      where: { id },
    });

    return AssetTransformer.DMAssetTransformer(rawData);
  }

  public static async FindAggregate(): Promise<MDashboardAggregate> {
    const general = await db.asset.aggregate({
      _avg: { endPrice: true, startPrice: true },
      _max: { endPrice: true, startPrice: true },
      _sum: { endPrice: true, startPrice: true },
    });

    // const startCurrency = await db.asset.groupBy({
    //   _count: { startForexId: true },
    //   by: ['startCurrency'],
    //   orderBy: { startCurrency: 'desc' },
    //   where: { startCurrency: { not: null } },
    // });

    // const endCurrency = await db.asset.groupBy({
    //   _count: { endCurrency: true },
    //   by: ['endCurrency'],
    //   orderBy: { endCurrency: 'desc' },
    //   where: { endCurrency: { not: null } },
    // });

    const category = await db.asset.groupBy({
      _avg: { endPrice: true, startPrice: true },
      _count: { categoryId: true },
      _max: { endPrice: true, startPrice: true },
      _sum: { endPrice: true, startPrice: true },
      by: ['categoryId'],
      orderBy: { categoryId: 'desc' },
      where: {
        categoryId: { not: null },
      },
    });

    const ranking = await db.asset.findMany({
      orderBy: { startPrice: 'desc' },
      select: {
        category: { select: { name: true } },
        name: true,
        startDate: true,
        startForex: { select: { rate: true, targetCurrency: true } },
        startPrice: true,
      },
      take: 10,
    });

    const rawData: DDashboardAggregate = {
      category,
      general,
      ranking,
    };

    return DashboardTransformer.DMDashboardAggregateTransformer(rawData);
  }

  public static async TimeLineData() {
    const calendar = await db.asset.findMany({
      select: {
        endDate: true,
        endPrice: true,
        name: true,
        startDate: true,
        startPrice: true,
      },
      where: {
        endDate: { gte: dayjs().startOf('month').toDate(), lte: dayjs().endOf('month').toDate() },
        startDate: { gte: dayjs().startOf('month').toDate(), lte: dayjs().endOf('month').toDate() },
      },
    });
  }
}
