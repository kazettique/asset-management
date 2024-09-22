import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

import { DashboardService } from '@/service';
import { CommonTransformer } from '@/transformer';
import { DashboardValidator } from '@/validator';

// ref: https://www.queryexamples.com/sql/general/sql-birthdate-query/
// ref: https://stackoverflow.com/questions/83531/sql-select-upcoming-birthdays
export async function GET(request: NextRequest) {
  const now = dayjs().toDate();

  const test = await DashboardService.FindAssetInMonthInterval(now);

  const validation = DashboardValidator.MDashboardCalendarValidator.safeParse(test);

  console.log('validation', validation.error);

  return NextResponse.json(CommonTransformer.ResponseTransformer(test));
}
