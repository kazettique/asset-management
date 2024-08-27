import { MethodType, Prisma } from '@prisma/client';

import { NNumber, NString, NType } from '../base';
import { Id } from '../common';

export interface DAsset {
  brand: { name: Prisma.JsonValue };
  comment: NString;
  endCurrency: NType<{ display: string; symbol: string }>;
  endDate: NType<Date>;
  endMethod: NType<{ name: Prisma.JsonValue; type: MethodType }>;
  endPrice: NNumber;
  id: Id;
  isCensored: boolean;
  meta: Prisma.JsonValue;
  name: Prisma.JsonValue;
  startCurrency: { display: string; symbol: string };
  startDate: Date;
  startMethod: { name: Prisma.JsonValue; type: MethodType };
  startPrice: number;
}
