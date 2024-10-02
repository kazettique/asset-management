import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';

import { prisma } from '@/lib/db';
import {
  AssetLifeStatus,
  AssetMeta,
  DAsset,
  DAssetOwnership,
  DDashboardAggregate,
  DDashboardCalendar,
  DTag,
  Id,
  Name,
  NString,
  NType,
  PAssetFind,
  Price,
  SettingKey,
} from '@/types';

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

const sortObj: Prisma.AssetOrderByWithRelationInput[] = [{ createdAt: Prisma.SortOrder.desc }];

export abstract class AssetRepository {
  public static async FindAll(): Promise<DAsset[]> {
    return await prisma.asset.findMany({
      select: queryObj,
    });
  }

  // ref: https://github.com/prisma/prisma/discussions/3087
  public static async FindMany(
    pageSize: PAssetFind['pageSize'],
    filters: PAssetFind['filters'],
    sort: PAssetFind['sort'],
    skipCount: number,
    search: string | undefined,
  ): Promise<[number, DAsset[]]> {
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
      AND: {
        OR: [
          { name: { contains: search } },
          { comment: { contains: search } },
          { tags: { some: { name: { contains: search } } } },
        ],
      },
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

    if (sort) {
      sortObj.unshift({ [sort.key]: sort.order });
    }

    return await prisma.$transaction([
      prisma.asset.count({ where: filterObj }),
      prisma.asset.findMany({
        orderBy: sortObj,
        select: queryObj,
        skip: skipCount,
        take: pageSize,
        where: filterObj,
      }),
    ]);
  }

  public static async Find(id: Id): Promise<NType<DAsset>> {
    return await prisma.asset.findUnique({
      select: queryObj,
      where: { id },
    });
  }

  public static async FindOwnership(id: Id): Promise<NType<DAssetOwnership>> {
    return await prisma.asset.findUnique({
      select: { id: true, ownerId: true },
      where: { id },
    });
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
  ): Promise<DAsset> {
    return await prisma.asset.create({
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
  }

  public static async Delete(id: Id): Promise<[Prisma.BatchPayload, DAsset]> {
    return await prisma.$transaction([
      prisma.ownershipHistory.deleteMany({
        where: { assetId: id },
      }),
      prisma.asset.delete({
        select: queryObj,
        where: { id },
      }),
    ]);
  }

  public static async Update(
    id: DAsset['id'],
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
  ): Promise<DAsset> {
    return await prisma.asset.update({
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
  }

  public static async FindAggregate(): Promise<DDashboardAggregate> {
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
      prisma.setting.findUnique({
        select: { value: true },
        where: {
          key: SettingKey.DISPLAY_FOREX,
        },
      }),
    ]);

    const rawData: DDashboardAggregate = {
      allCategories: transaction[4],
      category,
      deadCount: transaction[3],
      displayForex: transaction[5] && typeof transaction[5].value === 'string' ? transaction[5].value : null,
      general: transaction[0],
      liveCount: transaction[2],
      ranking: transaction[1],
    };

    return rawData;
  }

  public static async FindAssetInMonthInterval(currentDate: Date): Promise<DDashboardCalendar> {
    const rawData = await prisma.$queryRaw`
      Select Asset.name, Asset.startDate, Asset.startPrice, Forex.targetCurrency, Forex.rate
      FROM Asset
      LEFT JOIN Forex ON Asset.startForexId = Forex.id
      WHERE MONTH(Asset.startDate) = MONTH(${currentDate})
      ORDER BY DAY(Asset.startDate) ASC
    `;

    return { birthday: rawData } as DDashboardCalendar;
  }

  public static async FindAssetInTimeInterval(startDate: Date, endDate: Date): Promise<any> {
    const filterObj: Prisma.AssetWhereInput = {
      endDate: { lte: endDate },
      startDate: { gte: startDate },
    };

    // const rawData = await prisma.asset.findMany({
    //   orderBy: sortObj,
    //   where: filterObj,
    // });

    const rawData = await prisma.$queryRaw`
      SELECT name, startPrice, startDate
      FROM Asset
      WHERE Asset.startDate BETWEEN ${startDate} AND ${endDate}
      GROUP BY YEAR(Asset.startDate), MONTH(Asset.startDate)
    `;

    return rawData;
  }
}
