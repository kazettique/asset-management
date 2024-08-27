import { NextResponse } from 'next/server';

import { MSG_DIRTY_DATA } from '@/constant';
import { CategoryRepository } from '@/repository';
import { CategoryTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, VCategory } from '@/types';
import { CommonTransformer } from '@/utils';
import { RCategoryValidator, VCategoryValidator } from '@/validator';

export async function GET(_request: Request): Promise<NextResponse<GeneralResponse<VCategory[]>> | Response> {
  const raw = await CategoryRepository.getAll();

  const transformedData = raw.map((item) => CategoryTransformer.DCategoryTransformer(item));
  const dataValidation = VCategoryValidator.array().safeParse(transformedData);

  if (dataValidation.success) {
    return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
  } else {
    return new Response(MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
  }
}

export async function POST(request: Request): Promise<Response | NextResponse<GeneralResponse<VCategory>>> {
  // 1. parse request body
  const requestBody = await request.json();

  // 2. validate request body
  const requestValidation = RCategoryValidator.safeParse(requestBody);

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
