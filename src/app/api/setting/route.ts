// export async function GET(_request: Request): Promise<NextResponse<GeneralResponse<VPlace[]>> | Response> {
//   const raw = await PlaceRepository.getAll();

//   const transformedData = raw.map((item) => PlaceTransformer.DPlaceTransformer(item));
//   const dataValidation = VPlaceValidator.array().safeParse(transformedData);

//   if (dataValidation.success) {
//     return NextResponse.json(CommonTransformer.ResponseTransformer(dataValidation.data));
//   } else {
//     return new Response(MSG_DIRTY_DATA, { status: HttpStatusCode.BAD_REQUEST });
//   }
// }
