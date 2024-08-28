import { NextResponse } from 'next/server';

import { MSG_DIRTY_DATA } from '@/constant';
import { CategoryRepository } from '@/repository';
import { CategoryTransformer, CommonTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, Id, VCategory } from '@/types';
import { IdValidator, RCategoryValidator, VCategoryValidator } from '@/validator';

type Segments = { params: { id: Id } };

export async function GET(
  _request: Request,
  { params }: Segments,
): Promise<Response | NextResponse<GeneralResponse<VCategory>>> {
  const idValidation = IdValidator.safeParse(params.id);

  if (!idValidation.success) {
    return new Response(JSON.stringify(idValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const raw = await CategoryRepository.get(idValidation.data);

    if (raw === null) {
      return new Response(null, { status: HttpStatusCode.NO_CONTENT });
    } else {
      const transformedData = CategoryTransformer.DCategoryTransformer(raw);
      const dataValidation = VCategoryValidator.safeParse(transformedData);

      if (dataValidation.success) {
        return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
      } else {
        return new Response(MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
      }
    }
  }
}

export async function DELETE(
  _request: Request,
  { params }: Segments,
): Promise<Response | NextResponse<GeneralResponse<VCategory>>> {
  const idValidation = IdValidator.safeParse(params.id);

  if (!idValidation.success) {
    return new Response(JSON.stringify(idValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const raw = await CategoryRepository.delete(idValidation.data);
    const data = CategoryTransformer.MCategoryTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}

export async function POST(
  request: Request,
  { params }: Segments,
): Promise<Response | NextResponse<GeneralResponse<VCategory>>> {
  const idValidation = IdValidator.safeParse(params.id);
  const requestBody = await request.json();

  const requestValidation = RCategoryValidator.safeParse(requestBody);

  if (!idValidation.success || !requestValidation.success) {
    return new Response(JSON.stringify(idValidation.error) + JSON.stringify(requestValidation.error), {
      status: HttpStatusCode.BAD_REQUEST,
    });
  } else {
    const raw = await CategoryRepository.update(requestValidation.data, idValidation.data);
    const data = CategoryTransformer.MCategoryTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
