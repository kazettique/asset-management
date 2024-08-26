import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { CommonTransformer } from '@/utils';

export async function GET(_request: Request) {
  const categoryList = await db.brand.findMany({
    select: {
      comment: true,
      id: true,
      name: true,
    },
  });

  return NextResponse.json(CommonTransformer.ResponseTransformer(categoryList));
}
