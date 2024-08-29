import { NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import { MethodRepository } from '@/repository';
import { CommonTransformer, MethodTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, Id, VMethod } from '@/types';
import { CommonValidator, MethodValidator } from '@/validator';

type Segments = { params: { id: Id } };

export async function GET(
  _request: Request,
  { params }: Segments,
): Promise<Response | NextResponse<GeneralResponse<VMethod>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.id);

  if (!idValidation.success) {
    return new Response(JSON.stringify(idValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const raw = await MethodRepository.get(idValidation.data);

    if (raw === null) {
      return new Response(null, { status: HttpStatusCode.NO_CONTENT });
    } else {
      const transformedData = MethodTransformer.DMethodTransformer(raw);
      const dataValidation = MethodValidator.VMethodValidator.safeParse(transformedData);

      if (dataValidation.success) {
        return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
      } else {
        return new Response(CommonConstant.MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
      }
    }
  }
}

export async function DELETE(
  _request: Request,
  { params }: Segments,
): Promise<Response | NextResponse<GeneralResponse<VMethod>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.id);

  if (!idValidation.success) {
    return new Response(JSON.stringify(idValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const raw = await MethodRepository.delete(idValidation.data);
    const data = MethodTransformer.MMethodTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}

export async function POST(
  request: Request,
  { params }: Segments,
): Promise<Response | NextResponse<GeneralResponse<VMethod>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.id);
  const requestBody = await request.json();

  const requestValidation = MethodValidator.RMethodValidator.safeParse(requestBody);

  if (!idValidation.success || !requestValidation.success) {
    return new Response(JSON.stringify(idValidation.error) + JSON.stringify(requestValidation.error), {
      status: HttpStatusCode.BAD_REQUEST,
    });
  } else {
    const raw = await MethodRepository.update(requestValidation.data, idValidation.data);
    const data = MethodTransformer.MMethodTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
