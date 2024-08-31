import { AssetMeta, Name } from '../common';
import { VAsset } from '../viewModels';

export interface TAsset {
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
  usageTime: string;
}
