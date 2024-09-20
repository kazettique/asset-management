import { Prisma } from '@prisma/client';

import { Id, NType } from '../base';
import { AssetCommon, DbBase } from '../common';

export interface DAsset extends DbBase, AssetCommon {
  meta: NType<Prisma.JsonValue>;
}

export interface DAssetOwnership extends DbBase {
  ownerId: NType<Id>;
}
