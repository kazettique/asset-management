import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';
import { CommonTransformer } from '@/transformer';

// ref: https://www.queryexamples.com/sql/general/sql-birthdate-query/
// ref: https://stackoverflow.com/questions/83531/sql-select-upcoming-birthdays
export async function GET(request: NextRequest) {
  const raw = await prisma.asset.update({
    data: {
      tags: {
        disconnect: [{ id: '1af30a1c-3082-4824-9852-cc4fbce0146f' }, { id: '2507b2f6-d991-416d-afe1-11c3d5448d4e' }],
        // create: [{ name: 'hello-new-tag-4' }],
        // set: [],
        // connectOrCreate: [{ create: { name: 'hello-new-tag-3' }, where: { name: 'hello-new-tag-3' } }],
        // connect: [],
        // create: [],
        // set: undefined,
      },
    },
    where: {
      id: '905641ee-1051-4d97-9c4e-48a20da878eb',
    },
  });

  return NextResponse.json(CommonTransformer.ResponseTransformer(raw));
}
