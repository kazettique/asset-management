import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

import { AssetRepository } from '@/repository';
import { DashboardService } from '@/service';
import { CommonTransformer } from '@/transformer';
import { DashboardValidator } from '@/validator';

// ref: https://www.queryexamples.com/sql/general/sql-birthdate-query/
// ref: https://stackoverflow.com/questions/83531/sql-select-upcoming-birthdays
export async function GET(request: NextRequest) {
  const raw = await AssetRepository.FindAssetInTimeInterval(dayjs('2020-01-01').toDate(), dayjs().toDate());

  return NextResponse.json(CommonTransformer.ResponseTransformer(raw));
}
