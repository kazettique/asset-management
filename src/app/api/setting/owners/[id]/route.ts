import { NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import { OwnerService } from '@/service';
import { CommonTransformer, OwnerTransformer } from '@/transformer';
import { GeneralResponse, HttpStatusCode, Id, VOwner } from '@/types';
import { CommonValidator, OwnerValidator } from '@/validator';

type Segments = { params: { id: Id } };

export async function GET(
  _request: Request,
  { params }: Segments,
): Promise<Response | NextResponse<GeneralResponse<VOwner>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.id);

  if (!idValidation.success) {
    return new Response(JSON.stringify(idValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const raw = await OwnerService.Find(idValidation.data);

    if (raw === null) {
      return new Response(null, { status: HttpStatusCode.NO_CONTENT });
    } else {
      const transformedData = OwnerTransformer.DMOwnerTransformer(raw);
      const dataValidation = OwnerValidator.VOwnerValidator.safeParse(transformedData);

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
): Promise<Response | NextResponse<GeneralResponse<VOwner>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.id);

  if (!idValidation.success) {
    return new Response(JSON.stringify(idValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const raw = await OwnerService.Delete(idValidation.data);
    const data = OwnerTransformer.MVOwnerTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}

export async function PUT(
  request: Request,
  { params }: Segments,
): Promise<Response | NextResponse<GeneralResponse<VOwner>>> {
  const idValidation = CommonValidator.IdValidator.safeParse(params.id);
  const requestBody = await request.json();

  const requestValidation = OwnerValidator.POwnerValidator.safeParse(requestBody);

  if (!idValidation.success || !requestValidation.success) {
    return new Response(JSON.stringify(idValidation.error) + JSON.stringify(requestValidation.error), {
      status: HttpStatusCode.BAD_REQUEST,
    });
  } else {
    const { name, comment } = requestValidation.data;
    const raw = await OwnerService.Update(idValidation.data, name, comment);
    const data = OwnerTransformer.MVOwnerTransformer(raw);

    return NextResponse.json(CommonTransformer.ResponseTransformer(data));
  }
}
