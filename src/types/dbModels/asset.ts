import { Prisma } from '@prisma/client';

import { AssetCommon, DbBase } from '../common';
import { DTag } from './tag';

export interface DAsset extends DbBase, AssetCommon {
  meta: Prisma.JsonValue;
  tags: Pick<DTag, 'name' | 'id'>[];
}
