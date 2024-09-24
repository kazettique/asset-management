import { NextRequest, NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import { MethodService } from '@/service';
import { CommonTransformer, MethodTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, VMethod } from '@/types';
import { CommonValidator, MethodValidator } from '@/validator';

export async function GET(request: NextRequest): Promise<NextResponse<GeneralResponse<VMethod[]>> | Response> {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');

  const paramsValidation = CommonValidator.PFindPaginationValidator.safeParse({ page, pageSize });

  if (!paramsValidation.success) {
    return new Response('', { status: HttpStatusCode.BAD_REQUEST });
  }

  const { page: _page, pageSize: _pageSize } = paramsValidation.data;
  const rawData = await MethodService.FindMany(_page, _pageSize);

  const transformedData = rawData.data.map((item) => MethodTransformer.MVMethodTransformer(item));
  const dataValidation = MethodValidator.MMethodValidator.array().safeParse(transformedData);

  if (!dataValidation.success) {
    return new Response(CommonConstant.MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
  } else {
    return NextResponse.json(rawData);
  }
}

export async function POST(request: Request): Promise<Response | NextResponse<GeneralResponse<VMethod>>> {
  // 1. parse request body
  const requestBody = await request.json();

  // 2. validate request body
  const requestValidation = MethodValidator.PMethodValidator.safeParse(requestBody);

  // 3.1 if not passed, throw 400 bad request
  if (!requestValidation.success) {
    return new Response(JSON.stringify(requestValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const { name, type, comment } = requestValidation.data;
    // 3.2 if passed, fetch repository
    const raw = await MethodService.Create(name, type, comment);
    const data = MethodTransformer.MVMethodTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
