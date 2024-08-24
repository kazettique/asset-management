import { NextResponse } from 'next/server';

import { db } from '../lib/db';

export async function GET(request: Request) {
  const categoryList = await db.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return NextResponse.json(categoryList);
}
