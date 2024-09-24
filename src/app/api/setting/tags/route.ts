import { NextRequest, NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import { TagService } from '@/service';
import { CommonTransformer, TagTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, VTag } from '@/types';
import { TagValidator } from '@/validator';

export async function GET(request: NextRequest): Promise<NextResponse<GeneralResponse<VTag[]>> | Response> {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');

  const paramsValidation = TagValidator.PTagFindValidator.safeParse({ page, pageSize });

  if (!paramsValidation.success) {
    return new Response('', { status: HttpStatusCode.BAD_REQUEST });
  }

  const { page: _page, pageSize: _pageSize } = paramsValidation.data;
  const rawData = await TagService.FindMany(_page, _pageSize);

  const transformedData = rawData.data.map((item) => TagTransformer.MVTagTransformer(item));
  const dataValidation = TagValidator.VTagValidator.array().safeParse(transformedData);

  if (!dataValidation.success) {
    return new Response(CommonConstant.MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
  } else {
    return NextResponse.json(rawData);
  }
}

export async function POST(request: Request): Promise<Response | NextResponse<GeneralResponse<VTag>>> {
  // 1. parse request body
  const requestBody = await request.json();

  // 2. validate request body
  const requestValidation = TagValidator.PTagValidator.safeParse(requestBody);

  // 3.1 if not passed, throw 400 bad request
  if (!requestValidation.success) {
    return new Response(JSON.stringify(requestValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const { name, comment } = requestValidation.data;
    // 3.2 if passed, fetch repository
    const raw = await TagService.Create(name, comment);
    const data = TagTransformer.MVTagTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
