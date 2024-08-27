import { Prisma } from '@prisma/client';

import { Id, NString } from '@/types';

export interface DOwner {
  comment: NString;
  id: Id;
  name: Prisma.JsonValue;
}
