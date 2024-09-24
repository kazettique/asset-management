import { CommonConstant } from '@/constant';
import { PlaceRepository } from '@/repository';
import { PlaceTransformer } from '@/transformer';
import { Id, MPlace, NString, NType, PaginationBase } from '@/types';
import { Utils } from '@/utils';

export abstract class PlaceService {
  public static async FindAll(): Promise<MPlace[]> {
    const raw = await PlaceRepository.FindAll();

    return raw.map((place) => PlaceTransformer.DMPlaceTransformer(place));
  }

  public static async Find(id: Id): Promise<NType<MPlace>> {
    const raw = await PlaceRepository.Find(id);

    if (raw === null) {
      return raw;
    } else {
      return PlaceTransformer.DMPlaceTransformer(raw);
    }
  }

  public static async FindMany(
    page: number = CommonConstant.DEFAULT_PAGE,
    pageSize: number = CommonConstant.DEFAULT_PAGE_SIZE,
  ): Promise<PaginationBase<MPlace>> {
    const skipCount = Utils.CalculateSkipCount(page, pageSize);

    const raw = await PlaceRepository.FindMany(pageSize, skipCount);

    const [totalCount, rawData] = raw;
    const totalPage: number = Utils.CalculateTotalPage(totalCount, pageSize);

    return {
      data: rawData.map((quote) => PlaceTransformer.DMPlaceTransformer(quote)),
      page,
      totalCount,
      totalPage,
    };
  }

  public static async Create(name: string, comment: NString): Promise<MPlace> {
    const raw = await PlaceRepository.Create(name, comment);

    return PlaceTransformer.DMPlaceTransformer(raw);
  }

  public static async Delete(id: Id): Promise<MPlace> {
    const raw = await PlaceRepository.Delete(id);

    return PlaceTransformer.DMPlaceTransformer(raw[1]);
  }

  public static async Update(id: MPlace['id'], name: string, comment: NString): Promise<MPlace> {
    const raw = await PlaceRepository.Update(id, name, comment);

    return PlaceTransformer.DMPlaceTransformer(raw);
  }
}
