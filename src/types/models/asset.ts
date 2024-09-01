import { AssetCommon, AssetMeta, DbBase } from '../common';
import { DTag } from '../dbModels';

export interface MAsset extends DbBase, AssetCommon {
  meta: AssetMeta;
  tags: Pick<DTag, 'name' | 'id'>[];
}
