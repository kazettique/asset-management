import { NType } from '../base';
import { AssetCommon, AssetMeta, DbBase } from '../common';
import { DTag } from '../dbModels';

export interface MAsset extends DbBase, AssetCommon {
  meta: NType<AssetMeta>;
  tags: Pick<DTag, 'name' | 'id'>[];
}
