import { NextResponse } from 'next/server';

import { CommonConstant } from '@/constant/common';
import { DashboardService } from '@/service';
import { CommonTransformer, DashboardTransformer } from '@/transformer';
import { HttpStatusCode, VDashboardAggregate } from '@/types';
import { DashboardValidator } from '@/validator';

export async function GET(_request: Request): Promise<Response | NextResponse<VDashboardAggregate>> {
  const rawData = await DashboardService.FindAggregate();

  const transformedData = DashboardTransformer.MVDashboardAggregateTransformer(rawData);

  const dataValidation = DashboardValidator.VDashboardAggregateValidator.safeParse(transformedData);

  if (!dataValidation.success) {
    return new Response(JSON.stringify({ error: dataValidation.error, message: CommonConstant.MSG_DIRTY_DATA }), {
      status: HttpStatusCode.BAD_REQUEST,
    });
  } else {
    return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
  }
}
