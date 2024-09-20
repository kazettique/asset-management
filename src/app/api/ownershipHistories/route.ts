import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';
import { CommonTransformer } from '@/transformer';

export async function GET(_request: Request) {
  const ownershipHistoryList = await prisma.ownershipHistory.findMany({
    select: {
      comment: true,
      id: true,
      ownerId: true,
      startDate: true,
    },
  });

  return NextResponse.json(CommonTransformer.ResponseTransformer(ownershipHistoryList));
}
