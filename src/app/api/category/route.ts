import { NextResponse } from 'next/server';

import { CategoryRepository } from '@/repository';
import { CategoryTransformer } from '@/transformer';
import { DBCreateCategory, HttpStatusCode } from '@/type';
import { ResponseTransformer } from '@/utils';
import { RCreateCategoryValidator, VCategoryValidator } from '@/validator';

export async function GET(_request: Request) {
  const raw = await CategoryRepository.getAllCategory();

  const transformedData = raw.map((item) => CategoryTransformer.categoryTransformer(item));
  const dataValidation = VCategoryValidator.array().safeParse(transformedData);

  if (dataValidation.success) {
    return NextResponse.json(ResponseTransformer(dataValidation.data));
  } else {
    return new Response('dirty data', { status: HttpStatusCode.BAD_REQUEST });
  }
}

export async function POST(request: Request) {
  // 1. parse request body
  const requestBody = await request.json();

  // 2. validate request body
  const requestValidation = RCreateCategoryValidator.safeParse(requestBody);

  // 3.1 if not passed, throw 400 bad request
  if (!requestValidation.success) {
    return new Response(JSON.stringify(requestValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const dbCreateCategory: DBCreateCategory = CategoryTransformer.createCategoryTransformer(requestValidation.data);
    // 3.2 if passed, fetch repository
    const raw = await CategoryRepository.createCategory(dbCreateCategory);

    // console.log('raw', raw);

    return NextResponse.json(ResponseTransformer(raw));
  }
}
