import { NType } from '../base';
import { AssetCommon, AssetMeta, DbBase } from '../common';
import { DAssetOwnership } from '../dbModels';

export interface MAsset extends DbBase, AssetCommon {
  meta: NType<AssetMeta>;
}

export interface MAssetOwnership extends DAssetOwnership {}
