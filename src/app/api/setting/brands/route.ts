import { NextRequest, NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import { BrandService } from '@/service';
import { BrandTransformer, CommonTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, VBrand } from '@/types';
import { BrandValidator, CommonValidator } from '@/validator';

export async function GET(request: NextRequest): Promise<NextResponse<GeneralResponse<VBrand[]>> | Response> {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');

  const paramsValidation = CommonValidator.PFindPaginationValidator.safeParse({ page, pageSize });

  if (!paramsValidation.success) {
    return new Response('', { status: HttpStatusCode.BAD_REQUEST });
  }

  const { page: _page, pageSize: _pageSize } = paramsValidation.data;
  const rawData = await BrandService.FindMany(_page, _pageSize);

  const transformedData = rawData.data.map((item) => BrandTransformer.MVBrandTransformer(item));
  const dataValidation = BrandValidator.VBrandValidator.array().safeParse(transformedData);

  if (!dataValidation.success) {
    return new Response(CommonConstant.MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
  } else {
    return NextResponse.json(rawData);
  }
}

export async function POST(request: Request): Promise<Response | NextResponse<GeneralResponse<VBrand>>> {
  // 1. parse request body
  const requestBody = await request.json();

  // 2. validate request body
  const requestValidation = BrandValidator.PBrandValidator.safeParse(requestBody);

  // 3.1 if not passed, throw 400 bad request
  if (!requestValidation.success) {
    return new Response(JSON.stringify(requestValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const { name, comment } = requestValidation.data;
    // 3.2 if passed, fetch repository
    const raw = await BrandService.Create(name, comment);
    const data = BrandTransformer.MVBrandTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
