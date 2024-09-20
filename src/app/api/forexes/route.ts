import { CurrencyCode } from 'currency-codes-ts/dist/types';
import { NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import { ForexService } from '@/service';
import { CommonTransformer, ForexTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, VForex } from '@/types';
import { ForexValidator } from '@/validator';

export async function GET(_request: Request): Promise<NextResponse<GeneralResponse<VForex[]>> | Response> {
  const raw = await ForexService.FindAll();

  const transformedData = raw.map((item) => ForexTransformer.DMForexTransformer(item));
  const dataValidation = ForexValidator.VForexValidator.array().safeParse(transformedData);

  if (dataValidation.success) {
    return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
  } else {
    return new Response(CommonConstant.MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
  }
}

export async function POST(request: Request): Promise<Response | NextResponse<GeneralResponse<VForex>>> {
  // 1. parse request body
  const requestBody = await request.json();

  // 2. validate request body
  const requestValidation = ForexValidator.PForexValidator.safeParse(requestBody);

  // 3.1 if not passed, throw 400 bad request
  if (!requestValidation.success) {
    return new Response(JSON.stringify(requestValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const { rate, targetCurrency, date } = requestValidation.data;
    // 3.2 if passed, fetch repository
    const raw = await ForexService.Create(date, targetCurrency, rate);
    const data = ForexTransformer.MVForexTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
