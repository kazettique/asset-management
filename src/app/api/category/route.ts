import { NextResponse } from 'next/server';

import { MSG_DIRTY_DATA } from '@/constant';
import { CategoryRepository } from '@/repository';
import { CategoryTransformer } from '@/transformer';
import { DBCreateCategory, HttpStatusCode, MCategory } from '@/type';
import { ResponseTransformer } from '@/utils';
import { RCreateCategoryValidator, VCategoryValidator } from '@/validator';

// todo: add return type
export async function GET(_request: Request) {
  const raw = await CategoryRepository.getAllCategory();

  const transformedData = raw.map((item) => CategoryTransformer.categoryTransformer(item));
  const dataValidation = VCategoryValidator.array().safeParse(transformedData);

  if (dataValidation.success) {
    return NextResponse.json(ResponseTransformer(dataValidation.data));
  } else {
    return new Response(MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
  }
}

// todo: add return type
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

    // todo: transform return data, or define return type
    return NextResponse.json(ResponseTransformer(raw));
  }
}
