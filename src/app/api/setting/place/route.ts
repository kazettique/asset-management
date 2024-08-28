import { NextResponse } from 'next/server';

import { MSG_DIRTY_DATA } from '@/constant';
import { PlaceRepository } from '@/repository';
import { CommonTransformer, PlaceTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, VPlace } from '@/types';
import { RPlaceValidator, VPlaceValidator } from '@/validator';

export async function GET(_request: Request): Promise<NextResponse<GeneralResponse<VPlace[]>> | Response> {
  const raw = await PlaceRepository.getAll();

  const transformedData = raw.map((item) => PlaceTransformer.DPlaceTransformer(item));
  const dataValidation = VPlaceValidator.array().safeParse(transformedData);

  if (dataValidation.success) {
    return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
  } else {
    return new Response(MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
  }
}

export async function POST(request: Request): Promise<Response | NextResponse<GeneralResponse<VPlace>>> {
  // 1. parse request body
  const requestBody = await request.json();

  // 2. validate request body
  const requestValidation = RPlaceValidator.safeParse(requestBody);

  // 3.1 if not passed, throw 400 bad request
  if (!requestValidation.success) {
    return new Response(JSON.stringify(requestValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    // 3.2 if passed, fetch repository
    const raw = await PlaceRepository.create(requestValidation.data);
    const data = PlaceTransformer.MPlaceTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
