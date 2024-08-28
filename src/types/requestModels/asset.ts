import { AssetCommon, AssetMeta, Name } from '../common';

export interface RAsset extends AssetCommon {
  meta: AssetMeta;
  name: Name;
}
