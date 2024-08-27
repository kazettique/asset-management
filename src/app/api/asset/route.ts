import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET(_request: Request) {
  const rawData = await db.asset.findMany({
    select: {
      brand: {
        select: { name: true },
      },
      comment: true,
      endCurrency: {
        select: { display: true, symbol: true },
      },
      endDate: true,
      endMethod: {
        select: { name: true, type: true },
      },
      endPrice: true,
      id: true,
      isCensored: true,
      meta: true,
      name: true,
      startCurrency: {
        select: { display: true, symbol: true },
      },
      startDate: true,
      startMethod: {
        select: { name: true, type: true },
      },
      startPrice: true,
    },
  });

  return NextResponse.json(rawData);
}
