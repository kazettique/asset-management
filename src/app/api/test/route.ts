import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { CommonTransformer } from '@/transformer';

export async function GET(_request: Request) {
  const rawData = await db.asset.create({
    data: {
      brandId: '46241c99-a7f3-49d3-b2f1-6d2916b32e09',
      categoryId: '28c40ba8-55c5-4171-a317-824c6aba09b3',
      comment: 'this is comment',
      isCensored: false,
      meta: [{ color: 'red' }, { size: 'M' }],
      name: 'hello5566',
      startCurrencyId: '8c468df4-bc10-4f2f-91f3-6bba0ed94d4e',
      startDate: new Date(),
      startMethodId: 'af0dff05-5bb0-4b18-bccc-9b54509edd10',
      startPlatformId: '9bace7c8-d2b1-4487-8a3e-26190acc1c20',
      startPrice: 321,
      tags: {
        connect: [{ id: 'a606ccdb-6121-490f-8bac-936a149c2142' }, { id: '17a22ce9-0f58-46c2-8863-483c95765aae' }],
        create: [{ name: '這是新建標籤' }],
      },
    },
  });

  // return NextResponse.error();
  return NextResponse.json(CommonTransformer.ResponseTransformer(rawData));
}
