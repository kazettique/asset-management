import { NextResponse } from 'next/server';

import { db } from '../../lib/db';
import { ResponseTransformer } from '../../lib/utils';

export async function GET(request: Request) {
  const categoryList = await db.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return NextResponse.json(ResponseTransformer(categoryList));
  // return new Response(, { status: HttpStatusCode.UNPROCESSABLE_ENTITY });
}
