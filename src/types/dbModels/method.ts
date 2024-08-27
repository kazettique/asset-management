import { MethodType, Prisma } from '@prisma/client';

import { NString } from '../base';
import { DbBase } from '../common';

export interface DMethod extends DbBase {
  comment: NString;
  name: Prisma.JsonValue;
  type: MethodType;
}
