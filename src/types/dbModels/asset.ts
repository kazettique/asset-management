import { Prisma } from '@prisma/client';

import { NType } from '../base';
import { AssetCommon, DbBase } from '../common';
import { DTag } from './tag';

export interface DAsset extends DbBase, AssetCommon {
  meta: NType<Prisma.JsonValue>;
  tags: Pick<DTag, 'name' | 'id'>[];
}
