import { Prisma } from '@prisma/client';

import { Id, NString } from '@/types';

export interface MCategory {
  comment: NString;
  id: Id;
  name: Prisma.JsonValue;
}
