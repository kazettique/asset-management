import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { CommonConstant } from '@/constant/common';
import { DashboardService } from '@/service';
import { CommonTransformer, DashboardTransformer } from '@/transformer';
import { HttpStatusCode, VDashboardAggregate } from '@/types';
import { DashboardValidator } from '@/validator';

export async function GET(request: NextRequest): Promise<Response | NextResponse<VDashboardAggregate>> {
  const searchParams = request.nextUrl.searchParams;
  const currentDate = searchParams.get('currentDate');

  const currentDateValidation = z.coerce.date().safeParse(currentDate);
  const _currentDate = currentDateValidation.success ? currentDateValidation.data : dayjs().toDate();

  const rawData = await DashboardService.FindAssetInMonthInterval(_currentDate);

  const transformedData = DashboardTransformer.MVDashboardCalendarTransformer(rawData);

  const dataValidation = DashboardValidator.VDashboardCalendarValidator.safeParse(transformedData);

  if (!dataValidation.success) {
    return new Response(JSON.stringify({ error: dataValidation.error, message: CommonConstant.MSG_DIRTY_DATA }), {
      status: HttpStatusCode.BAD_REQUEST,
    });
  } else {
    return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
  }
}
