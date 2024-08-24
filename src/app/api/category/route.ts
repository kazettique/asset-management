import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { ResponseTransformer } from '@/utils';

export async function GET(request: Request) {
  const categoryList = await db.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return NextResponse.json(ResponseTransformer(categoryList));
}
