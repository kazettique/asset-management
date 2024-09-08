import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { CommonTransformer } from '@/transformer';

export async function GET(_request: Request) {
  const categoryList = await db.ownershipHistory.findMany({
    select: {
      comment: true,
      endDate: true,
      id: true,
      ownerId: true,
      startDate: true,
    },
  });

  return NextResponse.json(CommonTransformer.ResponseTransformer(categoryList));
}
