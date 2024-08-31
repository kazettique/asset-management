import { Prisma } from '@prisma/client';

import { AssetCommon, DbBase } from '../common';

export interface DAsset extends DbBase, AssetCommon {
  meta: Prisma.JsonValue;
}
