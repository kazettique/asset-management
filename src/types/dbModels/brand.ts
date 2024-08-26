import { Prisma } from '@prisma/client';

import { Id, NString } from '@/types';

export interface DBrand {
  comment: NString;
  id: Id;
  name: Prisma.JsonValue;
}
