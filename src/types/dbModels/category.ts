import { Prisma } from '@prisma/client';

import { DbBase, NString } from '@/types';

export interface DCategory extends DbBase {
  comment: NString;
  name: Prisma.JsonValue;
}
