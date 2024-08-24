import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { ResponseTransformer } from '@/utils';

export async function GET(request: Request) {
  const categoryList = await db.currency.findMany({
    select: {
      comment: true,
      display: true,
      id: true,
      name: true,
      symbol: true,
    },
  });

  return NextResponse.json(ResponseTransformer(categoryList));
}
