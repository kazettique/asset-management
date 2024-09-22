import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';

import { CommonConstant } from '@/constant';
import { prisma } from '@/lib/db';
import { AssetTransformer, DashboardTransformer } from '@/transformer';
import {
  AssetLifeStatus,
  AssetMeta,
  DAsset,
  DAssetOwnership,
  DDashboardAggregate,
  DDashboardCalendar,
  DTag,
  Id,
  MAsset,
  MAssetOwnership,
  MDashboardAggregate,
  MDashboardCalendar,
  Name,
  NString,
  NType,
  PaginationBase,
  PAssetFind,
  Price,
} from '@/types';
import { Utils } from '@/utils';

import { CategoryRepository } from './category';

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
    const rawData: DAsset[] = await prisma.asset.findMany({
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

    const raw = await prisma.$transaction([
      prisma.asset.count({ where: filterObj }),
      prisma.asset.findMany({
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
    const rawData: NType<DAsset> = await prisma.asset.findUnique({
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
    const rawData: NType<DAssetOwnership> = await prisma.asset.findUnique({
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
    brandId: Id,
    categoryId: Id,
    comment: NString,
    endDate: NType<Date>,
    endForexId: NType<Id>,
    endMethodId: NType<Id>,
    endPlatformId: NType<Id>,
    endPrice: NType<Price>,
    isCensored: boolean,
    meta: AssetMeta,
    name: Name,
    ownerId: Id,
    placeId: Id,
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
    const rawData = await prisma.asset.create({
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
    const transaction = await prisma.$transaction([
      prisma.ownershipHistory.deleteMany({
        where: { assetId: id },
      }),
      prisma.asset.delete({
        select: queryObj,
        where: { id },
      }),
    ]);

    return AssetTransformer.DMAssetTransformer(transaction[1]);
  }

  public static async Update(
    id: MAsset['id'],
    brandId: Id,
    categoryId: Id,
    comment: NString,
    endDate: NType<Date>,
    endForexId: NType<Id>,
    endMethodId: NType<Id>,
    endPlatformId: NType<Id>,
    endPrice: NType<Price>,
    isCensored: boolean,
    meta: AssetMeta,
    name: Name,
    ownerId: Id,
    placeId: Id,
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
    const rawData = await prisma.asset.update({
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
    const liveQueryObj: Prisma.AssetWhereInput = {
      OR: [
        {
          endDate: { equals: null },
        },
        {
          endDate: { gte: dayjs().toDate() },
        },
      ],
    };

    const deadQueryObj: Prisma.AssetWhereInput = {
      AND: [
        {
          endDate: { not: { equals: null } },
        },
        {
          endDate: { lte: dayjs().toDate() },
        },
      ],
    };

    const category = await prisma.asset.groupBy({
      _avg: { endPrice: true, startPrice: true },
      _count: { categoryId: true },
      _max: { endPrice: true, startPrice: true },
      _sum: { endPrice: true, startPrice: true },
      by: ['categoryId'],
      orderBy: { categoryId: 'desc' },
    });

    const transaction = await prisma.$transaction([
      prisma.asset.aggregate({
        _avg: { endPrice: true, startPrice: true },
        _max: { endPrice: true, startPrice: true },
        _sum: { endPrice: true, startPrice: true },
      }),
      // TODO: strange type
      // prisma.asset.groupBy({
      //   _avg: { endPrice: true, startPrice: true },
      //   _count: { categoryId: true },
      //   _max: { endPrice: true, startPrice: true },
      //   _sum: { endPrice: true, startPrice: true },
      //   by: ['categoryId'],
      //   orderBy: { categoryId: 'desc' },
      // }),
      prisma.asset.findMany({
        orderBy: { startPrice: 'desc' },
        select: {
          category: { select: { name: true } },
          name: true,
          startDate: true,
          startForex: { select: { rate: true, targetCurrency: true } },
          startPrice: true,
        },
        take: 10,
      }),
      prisma.asset.count({ where: liveQueryObj }),
      prisma.asset.count({ where: deadQueryObj }),
      prisma.category.findMany({
        select: { id: true, name: true },
      }),
    ]);

    const rawData: DDashboardAggregate = {
      allCategories: transaction[4],
      category,
      deadCount: transaction[3],
      general: transaction[0],
      liveCount: transaction[2],
      ranking: transaction[1],
    };

    return DashboardTransformer.DMDashboardAggregateTransformer(rawData);
  }

  public static async FindAssetInMonthInterval(currentDate: Date): Promise<MDashboardCalendar> {
    const rawData = await prisma.$queryRaw`
    Select asset.name, asset.startDate, asset.startPrice, forex.targetCurrency, forex.rate
    FROM asset
    LEFT JOIN forex ON asset.startForexId = forex.id
    WHERE MONTH(asset.startDate) = MONTH(${currentDate})
    ORDER BY DAY(asset.startDate) ASC
  `;

    return DashboardTransformer.DMDashboardCalendarTransformer({ birthday: rawData } as DDashboardCalendar);
  }
}
