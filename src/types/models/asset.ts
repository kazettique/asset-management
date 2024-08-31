import { AssetCommon, AssetMeta, DbBase } from '../common';

export interface MAsset extends DbBase, AssetCommon {
  meta: AssetMeta;
}
