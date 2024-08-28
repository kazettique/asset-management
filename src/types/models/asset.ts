import { AssetCommon, AssetMeta, DbBase, Name } from '../common';

export interface MAsset extends DbBase, AssetCommon {
  meta: AssetMeta;
  name: Name;
}
