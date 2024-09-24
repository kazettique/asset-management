import { NextRequest, NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import { PlaceService } from '@/service';
import { CommonTransformer, PlaceTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, VPlace } from '@/types';
import { CommonValidator, PlaceValidator } from '@/validator';

export async function GET(request: NextRequest): Promise<NextResponse<GeneralResponse<VPlace[]>> | Response> {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');

  const paramsValidation = CommonValidator.PFindPaginationValidator.safeParse({ page, pageSize });

  if (!paramsValidation.success) {
    return new Response('', { status: HttpStatusCode.BAD_REQUEST });
  }

  const { page: _page, pageSize: _pageSize } = paramsValidation.data;
  const rawData = await PlaceService.FindMany(_page, _pageSize);

  const transformedData = rawData.data.map((item) => PlaceTransformer.MVPlaceTransformer(item));
  const dataValidation = PlaceValidator.VPlaceValidator.array().safeParse(transformedData);

  if (!dataValidation.success) {
    return new Response(CommonConstant.MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
  } else {
    return NextResponse.json(rawData);
  }
}

export async function POST(request: Request): Promise<Response | NextResponse<GeneralResponse<VPlace>>> {
  // 1. parse request body
  const requestBody = await request.json();

  // 2. validate request body
  const requestValidation = PlaceValidator.PPlaceValidator.safeParse(requestBody);

  // 3.1 if not passed, throw 400 bad request
  if (!requestValidation.success) {
    return new Response(JSON.stringify(requestValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const { name, comment } = requestValidation.data;
    // 3.2 if passed, fetch repository
    const raw = await PlaceService.Create(name, comment);
    const data = PlaceTransformer.MVPlaceTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
