import { AssetCommon, AssetMeta, Name } from '../common';

export interface PAsset extends AssetCommon {
  meta: AssetMeta;
  name: Name;
}
