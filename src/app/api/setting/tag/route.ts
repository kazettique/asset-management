import { NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import { TagService } from '@/service';
import { CommonTransformer, TagTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, VTag } from '@/types';
import { TagValidator } from '@/validator';

export async function GET(_request: Request): Promise<NextResponse<GeneralResponse<VTag[]>> | Response> {
  const raw = await TagService.FindAll();

  const transformedData = raw.map((item) => TagTransformer.DMTagTransformer(item));
  const dataValidation = TagValidator.VTagValidator.array().safeParse(transformedData);

  if (dataValidation.success) {
    return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
  } else {
    return new Response(CommonConstant.MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
  }
}

export async function POST(request: Request): Promise<Response | NextResponse<GeneralResponse<VTag>>> {
  // 1. parse request body
  const requestBody = await request.json();

  // 2. validate request body
  const requestValidation = TagValidator.RTagValidator.safeParse(requestBody);

  // 3.1 if not passed, throw 400 bad request
  if (!requestValidation.success) {
    return new Response(JSON.stringify(requestValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    // 3.2 if passed, fetch repository
    const raw = await TagService.Create(requestValidation.data);
    const data = TagTransformer.MVTagTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
