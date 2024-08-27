import { NextResponse } from 'next/server';

import { MSG_DIRTY_DATA } from '@/constant';
import { OwnerRepository } from '@/repository';
import { OwnerTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, VOwner } from '@/types';
import { CommonTransformer } from '@/utils';
import { ROwnerValidator, VOwnerValidator } from '@/validator';

export async function GET(_request: Request): Promise<NextResponse<GeneralResponse<VOwner[]>> | Response> {
  const raw = await OwnerRepository.getAll();

  const transformedData = raw.map((item) => OwnerTransformer.DOwnerTransformer(item));
  const dataValidation = VOwnerValidator.array().safeParse(transformedData);

  if (dataValidation.success) {
    return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
  } else {
    return new Response(MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
  }
}

export async function POST(request: Request): Promise<Response | NextResponse<GeneralResponse<VOwner>>> {
  // 1. parse request body
  const requestBody = await request.json();

  // 2. validate request body
  const requestValidation = ROwnerValidator.safeParse(requestBody);

  // 3.1 if not passed, throw 400 bad request
  if (!requestValidation.success) {
    return new Response(JSON.stringify(requestValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    // 3.2 if passed, fetch repository
    const raw = await OwnerRepository.create(requestValidation.data);
    const data = OwnerTransformer.MOwnerTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
