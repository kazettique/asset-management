import { Prisma } from '@prisma/client';

import { NNumber, NType } from '../base';
import { AssetCommon, AssetMeta } from '../common';
import { DTag } from '../dbModels';
import { AssetLifeStatus } from '../enum';
import { VAsset } from '../viewModels';

export interface PAsset extends AssetCommon {
  meta: AssetMeta;
  tags: {
    connect: Pick<DTag, 'id'>[];
    create: { name: string }[];
  };
}

export interface PAssetFind {
  filters: {
    brands?: string[];
    categories?: string[];
    endDateRange?: [NType<Date>, NType<Date>];
    endMethods?: string[];
    endPlatforms?: string[];
    endPriceRange?: [NNumber, NNumber];
    lifeStatus?: AssetLifeStatus;
    owners?: string[];
    places?: string[];
    startDateRange?: [NType<Date>, NType<Date>];
    startMethods?: string[];
    startPlatforms?: string[];
    startPriceRange?: [NNumber, NNumber];
  };
  page?: number;
  pageSize?: number;
  // TODO: priceDiff, monthlyCost, lifeSpan
  sort?: {
    key: keyof Pick<VAsset, 'startPrice' | 'endPrice' | 'startDate' | 'endDate'>;
    order: Prisma.SortOrder;
  };
}
