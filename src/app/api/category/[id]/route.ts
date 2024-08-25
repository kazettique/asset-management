import { NextResponse } from 'next/server';

import { MSG_DIRTY_DATA } from '@/constant';
import { CategoryRepository } from '@/repository';
import { CategoryTransformer } from '@/transformer';
import { DBCreateCategory, HttpStatusCode, Id, MCategory } from '@/type';
import { ResponseTransformer } from '@/utils';
import { IdValidator, RUpdateCategoryValidator, VCategoryValidator } from '@/validator';

type Segments = { params: { id: Id } };

export async function GET(request: Request, { params }: Segments) {
  const idValidation = IdValidator.safeParse(params.id);

  if (!idValidation.success) {
    return new Response(JSON.stringify(idValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const raw = await CategoryRepository.getCategory(idValidation.data);

    if (raw === null) {
      return new Response(null, { status: HttpStatusCode.NO_CONTENT });
    } else {
      const transformedData = CategoryTransformer.categoryTransformer(raw);
      const dataValidation = VCategoryValidator.safeParse(transformedData);

      if (dataValidation.success) {
        return NextResponse.json(ResponseTransformer(dataValidation.data));
      } else {
        return new Response(MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
      }
    }
  }
}

export async function DELETE(request: Request, { params }: Segments) {
  const idValidation = IdValidator.safeParse(params.id);

  if (!idValidation.success) {
    return new Response(JSON.stringify(idValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const raw = await CategoryRepository.deleteCategory(idValidation.data);

    // todo: transform return data, or define return type
    return NextResponse.json(raw);
  }
}

export async function POST(request: Request, { params }: Segments) {
  const idValidation = IdValidator.safeParse(params.id);
  const requestBody = await request.json();

  const requestValidation = RUpdateCategoryValidator.safeParse(requestBody);

  if (!idValidation.success || !requestValidation.success) {
    return new Response(JSON.stringify(idValidation.error) + JSON.stringify(requestValidation.error), {
      status: HttpStatusCode.BAD_REQUEST,
    });
  } else {
    const dbCreateCategory: MCategory = CategoryTransformer.updateCategoryTransformer(requestValidation.data);
    const raw = await CategoryRepository.updateCategory(dbCreateCategory);

    // todo: transform return data, or define return type
    return NextResponse.json(raw);
  }
}
