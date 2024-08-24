import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { ResponseTransformer } from '@/utils';

export async function GET(request: Request) {
  const categoryList = await db.method.findMany({
    select: {
      comment: true,
      id: true,
      name: true,
      type: true,
    },
  });

  return NextResponse.json(ResponseTransformer(categoryList));
}
