import { NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import { CurrencyRepository } from '@/repository';
import { CurrencyService } from '@/service';
import { CommonTransformer, CurrencyTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, VCurrency } from '@/types';
import { CurrencyValidator } from '@/validator';

export async function GET(_request: Request): Promise<NextResponse<GeneralResponse<VCurrency[]>> | Response> {
  const raw = await CurrencyService.FindAll();

  const transformedData = raw.map((item) => CurrencyTransformer.DCurrencyTransformer(item));
  const dataValidation = CurrencyValidator.VCurrencyValidator.array().safeParse(transformedData);

  if (dataValidation.success) {
    return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
  } else {
    return new Response(CommonConstant.MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
  }
}

export async function POST(request: Request): Promise<Response | NextResponse<GeneralResponse<VCurrency>>> {
  // 1. parse request body
  const requestBody = await request.json();

  // 2. validate request body
  const requestValidation = CurrencyValidator.RCurrencyValidator.safeParse(requestBody);

  // 3.1 if not passed, throw 400 bad request
  if (!requestValidation.success) {
    return new Response(JSON.stringify(requestValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    // 3.2 if passed, fetch repository
    const raw = await CurrencyService.Create(requestValidation.data);
    const data = CurrencyTransformer.MCurrencyTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
