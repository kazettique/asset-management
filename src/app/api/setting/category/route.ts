import { NextResponse } from 'next/server';

import { Constants } from '@/constant';
import { CategoryRepository } from '@/repository';
import { CategoryTransformer, CommonTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, VCategory } from '@/types';
import { CategoryValidator } from '@/validator';

export async function GET(_request: Request): Promise<NextResponse<GeneralResponse<VCategory[]>> | Response> {
  const raw = await CategoryRepository.getAll();

  const transformedData = raw.map((item) => CategoryTransformer.MCategoryTransformer(item));
  const dataValidation = CategoryValidator.VCategoryValidator.array().safeParse(transformedData);

  if (!dataValidation.success) {
    return new Response(Constants.MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
  } else {
    return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
  }
}

export async function POST(request: Request): Promise<Response | NextResponse<GeneralResponse<VCategory>>> {
  // 1. parse request body
  const requestBody = await request.json();

  // 2. validate request body
  const requestValidation = CategoryValidator.RCategoryValidator.safeParse(requestBody);

  // 3.1 if not passed, throw 400 bad request
  if (!requestValidation.success) {
    return new Response(JSON.stringify(requestValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    // 3.2 if passed, fetch repository
    const raw = await CategoryRepository.create(requestValidation.data);
    const data = CategoryTransformer.MCategoryTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
