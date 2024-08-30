import { AssetMeta, Name } from '../common';
import { VAsset } from '../viewModels';

export interface TAsset {
  brand: string;
  endInfo: {
    endDate: string;
    endMethod: string;
    endPlace: string;
    endPrice: string;
  };
  meta: AssetMeta;
  monthlyCost: string;
  name: Name;
  priceDifference: string;
  raw: VAsset;
  startInfo: {
    startDate: string;
    startMethod: string;
    startPlace: string;
    startPrice: string;
  };
  usageTime: string;
}
