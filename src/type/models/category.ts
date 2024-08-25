import { Prisma } from '@prisma/client';

import { NString } from '@/type';

export interface MCategory {
  comment: NString;
  id: string;
  name: Prisma.JsonValue;
}
