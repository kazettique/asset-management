import { NextResponse } from 'next/server';

import { CommonConstant } from '@/constant';
import {
  BrandRepository,
  CategoryRepository,
  CurrencyRepository,
  MethodRepository,
  OwnerRepository,
  PlaceRepository,
} from '@/repository';
import { CommonTransformer, SettingTransformer } from '@/transformer';
import { HttpStatusCode } from '@/types';
import { SettingValidator } from '@/validator';

export async function GET(_request: Request) {
  const brands = await BrandRepository.getAll();
  const categories = await CategoryRepository.getAll();
  const currencies = await CurrencyRepository.getAll();
  const methods = await MethodRepository.getAll();
  const places = await PlaceRepository.getAll();
  const owners = await OwnerRepository.getAll();

  const transformedData = SettingTransformer.MSettingTransformer({
    brands,
    categories,
    currencies,
    methods,
    owners,
    places,
  });

  const dataValidation = SettingValidator.VSettingValidator.safeParse(transformedData);

  if (!dataValidation.success) {
    return new Response(JSON.stringify({ error: dataValidation.error, message: CommonConstant.MSG_DIRTY_DATA }), {
      status: HttpStatusCode.BAD_REQUEST,
    });
  } else {
    return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
  }
}
