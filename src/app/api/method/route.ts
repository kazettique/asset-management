import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { CommonTransformer } from '@/utils';

export async function GET(_request: Request) {
  const categoryList = await db.method.findMany({
    select: {
      comment: true,
      id: true,
      name: true,
      type: true,
    },
  });

  return NextResponse.json(CommonTransformer.ResponseTransformer(categoryList));
}
