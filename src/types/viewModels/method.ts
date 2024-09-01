import { MethodType } from '@prisma/client';

import { MMethod } from '@/types';

export interface VMethod extends MMethod {}

export interface VMethodTable {
  comment: string;
  name: string;
  raw: VMethod;
  type: MethodType;
}
