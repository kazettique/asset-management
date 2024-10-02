import { Prisma } from '@prisma/client';

import { Id, Name, NNumber, NString, NType, Price } from '../base';
import { AssetMeta } from '../common';
import { DTag } from '../dbModels';
import { AssetLifeStatus } from '../enum';
import { VAsset } from '../viewModels';
import { PFindPagination } from './common';

export interface PAsset {
  brandId: NType<Id>;
  categoryId: NType<Id>;
  comment: NString;
  endCurrency: NString;
  endDate: NType<Date>;
  endMethodId: NType<Id>;
  endPlatformId: NType<Id>;
  endPrice: NType<Price>;
  isCensored: boolean;
  meta: AssetMeta;
  name: Name;
  newBrand: NString;
  newCategory: NString;
  newEndPlatform: NString;
  newStartPlatform: NString;
  ownerId: Id;
  placeId: Id;
  startCurrency: NString;
  startDate: NType<Date>;
  startMethodId: NType<Id>;
  startPlatformId: NType<Id>;
  startPrice: NType<Price>;
  tags: {
    connect: Pick<DTag, 'id'>[];
    create: { name: string }[];
  };
}

export interface PAssetFindFilter {
  brands?: Id[];
  categories?: Id[];
  endDateRange?: [NType<Date>, NType<Date>];
  endMethods?: Id[];
  endPlatforms?: Id[];
  endPriceRange?: [NNumber, NNumber];
  lifeStatus?: AssetLifeStatus;
  owners?: Id[];
  places?: Id[];
  startDateRange?: [NType<Date>, NType<Date>];
  startMethods?: Id[];
  startPlatforms?: Id[];
  startPriceRange?: [NNumber, NNumber];
}

export interface PAssetFindSort {
  // TODO: priceDiff, monthlyCost, lifeSpan
  key: keyof Pick<VAsset, 'startPrice' | 'endPrice' | 'startDate' | 'endDate'>;
  order: Prisma.SortOrder;
}

export interface PAssetFind extends PFindPagination {
  filters: PAssetFindFilter;
  sort?: PAssetFindSort;
}
