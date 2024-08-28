import { NextResponse } from 'next/server';

import { MSG_DIRTY_DATA } from '@/constant';
import { BrandRepository } from '@/repository';
import { BrandTransformer, CommonTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, VBrand } from '@/types';
import { RBrandValidator, VBrandValidator } from '@/validator';

export async function GET(_request: Request): Promise<NextResponse<GeneralResponse<VBrand[]>> | Response> {
  const raw = await BrandRepository.getAll();

  const transformedData = raw.map((item) => BrandTransformer.DBrandTransformer(item));
  const dataValidation = VBrandValidator.array().safeParse(transformedData);

  if (dataValidation.success) {
    return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
  } else {
    return new Response(MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
  }
}

export async function POST(request: Request): Promise<Response | NextResponse<GeneralResponse<VBrand>>> {
  // 1. parse request body
  const requestBody = await request.json();

  // 2. validate request body
  const requestValidation = RBrandValidator.safeParse(requestBody);

  // 3.1 if not passed, throw 400 bad request
  if (!requestValidation.success) {
    return new Response(JSON.stringify(requestValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    // 3.2 if passed, fetch repository
    const raw = await BrandRepository.create(requestValidation.data);
    const data = BrandTransformer.MBrandTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
