import { Name, NType } from '../base';
import { AssetMeta } from '../common';
import { AssetLifeStatus } from '../enum';
import { PAssetFindSort } from '../payloadModels';
import { FFindPagination, FormOption } from './common';

// no null type in all properties
export interface FAsset {
  brandId: FormOption;
  categoryId: FormOption;
  comment: string;
  endCurrency: NType<FormOption>;
  endDate: NType<Date>;
  endMethodId: NType<FormOption>;
  endPlatformId: NType<FormOption>;
  endPrice: string;
  isCensored: boolean;
  meta: NType<AssetMeta>;
  name: Name;
  ownerId: FormOption;
  placeId: FormOption;
  startCurrency: NType<FormOption>;
  startDate: NType<Date>;
  startMethodId: NType<FormOption>;
  startPlatformId: NType<FormOption>;
  startPrice: string;
  tags: FormOption[];
}

export type FAssetImport = Omit<FAsset, 'name' | 'startDate' | 'startPrice' | 'endDate' | 'endPrice' | 'comment'> & {
  isLegalFileData: boolean | null;
};

export interface FAssetFindPrimaryFilter {
  categories: string[];
  lifeStatus: AssetLifeStatus;
  owners: string[];
}

export interface FAssetFindSecondaryFilter {
  brands: FormOption[];
  endDateRange: [string, string];
  endMethods: FormOption[];
  endPlatforms: FormOption[];
  endPriceRange: [string, string];
  places: FormOption[];
  startDateRange: [string, string];
  startMethods: FormOption[];
  startPlatforms: FormOption[];
  startPriceRange: [string, string];
}

export interface FAssetFindFilter extends FAssetFindPrimaryFilter, FAssetFindSecondaryFilter {}

export interface FAssetFindSort extends PAssetFindSort {}

export interface FAssetFindPagination extends FFindPagination {}

export interface FAssetFind extends FAssetFindPagination {
  filters: FAssetFindFilter;
  sort?: FAssetFindSort;
}
