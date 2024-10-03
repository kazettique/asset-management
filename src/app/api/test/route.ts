import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';
import { AssetRepository } from '@/repository';
import { CommonTransformer } from '@/transformer';

// ref: https://www.queryexamples.com/sql/general/sql-birthdate-query/
// ref: https://stackoverflow.com/questions/83531/sql-select-upcoming-birthdays
export async function GET(request: NextRequest) {
  const raw = await AssetRepository.FindAssetInTimeInterval(new Date(), new Date());

  return NextResponse.json(CommonTransformer.ResponseTransformer(raw));
}
