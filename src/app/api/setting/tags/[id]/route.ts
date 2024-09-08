import { NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import { TagService } from '@/service';
import { CommonTransformer, TagTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, Id, VTag } from '@/types';
import { CommonValidator, TagValidator } from '@/validator';

type Segments = { params: { id: Id } };

export async function GET(
  _request: Request,
  { params }: Segments,
): Promise<Response | NextResponse<GeneralResponse<VTag>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.id);

  if (!idValidation.success) {
    return new Response(JSON.stringify(idValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const raw = await TagService.Find(idValidation.data);

    if (raw === null) {
      return new Response(null, { status: HttpStatusCode.NO_CONTENT });
    } else {
      const transformedData = TagTransformer.DMTagTransformer(raw);
      const dataValidation = TagValidator.VTagValidator.safeParse(transformedData);

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
): Promise<Response | NextResponse<GeneralResponse<VTag>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.id);

  if (!idValidation.success) {
    return new Response(JSON.stringify(idValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const raw = await TagService.Delete(idValidation.data);
    const data = TagTransformer.MVTagTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}

export async function PUT(
  request: Request,
  { params }: Segments,
): Promise<Response | NextResponse<GeneralResponse<VTag>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.id);
  const requestBody = await request.json();

  const requestValidation = TagValidator.PTagValidator.safeParse(requestBody);

  if (!idValidation.success || !requestValidation.success) {
    return new Response(JSON.stringify(idValidation.error) + JSON.stringify(requestValidation.error), {
      status: HttpStatusCode.BAD_REQUEST,
    });
  } else {
    const raw = await TagService.Update(requestValidation.data, idValidation.data);
    const data = TagTransformer.MVTagTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
