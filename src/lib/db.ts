import 'server-only';

import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrisma: PrismaClient;
}

let _prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
  _prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  _prisma = global.cachedPrisma;
}

export const prisma = _prisma;
