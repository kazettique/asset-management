import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { ResponseTransformer } from '@/utils';

export async function GET(request: Request) {
  const categoryList = await db.ownershipHistory.findMany({
    select: {
      comment: true,
      endDate: true,
      id: true,
      ownerId: true,
      startDate: true,
    },
  });

  return NextResponse.json(ResponseTransformer(categoryList));
}
