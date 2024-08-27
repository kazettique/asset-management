import { NextResponse } from 'next/server';

import { MSG_DIRTY_DATA } from '@/constant';
import { db } from '@/lib/db';
import { HttpStatusCode } from '@/types';
import { DAssetValidator } from '@/validator';

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

  const rawDataValidation = DAssetValidator.array().safeParse(rawData);

  const test = rawData.map((item) => ({
    name: item.name,
    startPrice: item.startPrice,
  }));

  const sum = rawData.reduce((acc, curr) => acc + Number(curr.startPrice), 0);

  const temp1 = new Response(JSON.stringify(rawData), { status: 200 });
  const temp2 = NextResponse.json(rawData);

  return Response.json({ sum });

  // if (!rawDataValidation.success) {
  //   return new Response(MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
  // } else {
  //   return NextResponse.json(rawDataValidation.data);
  // }
}
