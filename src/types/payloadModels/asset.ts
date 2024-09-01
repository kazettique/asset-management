import { AssetCommon, AssetMeta } from '../common';
import { DTag } from '../dbModels';

export interface PAsset extends AssetCommon {
  meta: AssetMeta;
  tags: {
    connect: Pick<DTag, 'id'>[];
    create: { name: string }[];
  };
}
