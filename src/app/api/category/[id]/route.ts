import { NextResponse } from 'next/server';

import { CategoryRepository } from '@/repository';
import { HttpStatusCode } from '@/type';
import { IdValidator } from '@/validator';

export async function GET(request: Request) {}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const idValidation = IdValidator.safeParse(params.id);

  if (!idValidation.success) {
    return new Response(JSON.stringify(idValidation.error), { status: HttpStatusCode.BAD_REQUEST });
  } else {
    const raw = await CategoryRepository.deleteCategory(idValidation.data);

    // todo: transform return data, or define return type
    return NextResponse.json(raw);
  }
}
