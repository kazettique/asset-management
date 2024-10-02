import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';
import { AssetRepository } from '@/repository';
import { DashboardService } from '@/service';
import { CommonTransformer } from '@/transformer';
import { DashboardValidator } from '@/validator';

// ref: https://www.queryexamples.com/sql/general/sql-birthdate-query/
// ref: https://stackoverflow.com/questions/83531/sql-select-upcoming-birthdays
export async function GET(request: NextRequest) {
  const raw = await prisma.asset.findMany({
    where: {
      name: '手機',
    },
  });

  return NextResponse.json(CommonTransformer.ResponseTransformer(raw));
}
