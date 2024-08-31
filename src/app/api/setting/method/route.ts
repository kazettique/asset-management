import { NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import { MethodRepository } from '@/repository';
import { MethodService } from '@/service';
import { CommonTransformer, MethodTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, VMethod } from '@/types';
import { MethodValidator } from '@/validator';

export async function GET(_request: Request): Promise<NextResponse<GeneralResponse<VMethod[]>> | Response> {
  const raw = await MethodService.getAll();

  const transformedData = raw.map((item) => MethodTransformer.DMethodTransformer(item));
  const dataValidation = MethodValidator.VMethodValidator.array().safeParse(transformedData);

  if (dataValidation.success) {
    return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
  } else {
    return new Response(CommonConstant.MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
  }
}

export async function POST(request: Request): Promise<Response | NextResponse<GeneralResponse<VMethod>>> {
  // 1. parse request body
  const requestBody = await request.json();

  // 2. validate request body
  const requestValidation = MethodValidator.RMethodValidator.safeParse(requestBody);

  // 3.1 if not passed, throw 400 bad request
  if (!requestValidation.success) {
    return new Response(JSON.stringify(requestValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    // 3.2 if passed, fetch repository
    const raw = await MethodService.create(requestValidation.data);
    const data = MethodTransformer.MMethodTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
