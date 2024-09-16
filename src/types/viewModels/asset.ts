import { TaskStatus } from '@/machines/asset';

import { AssetMeta, CurrencyExchangeRate, Name } from '..';
import { MAsset } from '../models';

export interface VAsset extends MAsset {}

export interface VAssetTable {
  brand: string;
  category: string;
  comment: string;
  endInfo: {
    endCurrencyExchangeRate: CurrencyExchangeRate;
    endDate: string;
    endMethod: string;
    endPlatform: string;
    endPrice: string;
  };
  meta: AssetMeta;
  monthlyCost: string;
  name: Name;
  owner: string;
  place: string;
  priceDifference: string;
  raw: VAsset;
  startInfo: {
    startCurrencyExchangeRate: CurrencyExchangeRate;
    startDate: string;
    startMethod: string;
    startPlatform: string;
    startPrice: string;
  };
  tags: string[];
  usageTime: string;
}

export interface VAssetImportItem {
  comment: string;
  endDate: string;
  endPrice: string;
  name: string;
  startDate: string;
  startPrice: string;
}

export interface VAssetImportTable {
  name: string;
  no: number;
  status: TaskStatus;
}
