import { NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import { BrandService } from '@/service';
import { BrandTransformer, CommonTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, VBrand } from '@/types';
import { BrandValidator } from '@/validator';

export async function GET(_request: Request): Promise<NextResponse<GeneralResponse<VBrand[]>> | Response> {
  const raw = await BrandService.FindAll();

  const transformedData = raw.map((item) => BrandTransformer.DMBrandTransformer(item));
  const dataValidation = BrandValidator.VBrandValidator.array().safeParse(transformedData);

  if (dataValidation.success) {
    return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
  } else {
    return new Response(CommonConstant.MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
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
    // 3.2 if passed, fetch repository
    const raw = await BrandService.Create(requestValidation.data);
    const data = BrandTransformer.MVBrandTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
