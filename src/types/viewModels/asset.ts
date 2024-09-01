import { AssetMeta, Name } from '..';
import { MAsset } from '../models';

export interface VAsset extends MAsset {}

export interface VAssetTable {
  brand: string;
  category: string;
  endInfo: {
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
    startDate: string;
    startMethod: string;
    startPlatform: string;
    startPrice: string;
  };
  tags: string[];
  usageTime: string;
}
