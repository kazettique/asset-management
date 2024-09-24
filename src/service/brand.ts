import { CommonConstant } from '@/constant';
import { BrandRepository } from '@/repository';
import { BrandTransformer } from '@/transformer';
import { Id, MBrand, NString, NType, PaginationBase } from '@/types';
import { Utils } from '@/utils';

export abstract class BrandService {
  public static async FindAll(): Promise<MBrand[]> {
    const raw = await BrandRepository.FindAll();

    return raw.map((brand) => BrandTransformer.DMBrandTransformer(brand));
  }

  public static async Find(id: Id): Promise<NType<MBrand>> {
    const raw = await BrandRepository.Find(id);

    if (raw === null) {
      return raw;
    } else {
      return BrandTransformer.DMBrandTransformer(raw);
    }
  }

  public static async FindMany(
    page: number = CommonConstant.DEFAULT_PAGE,
    pageSize: number = CommonConstant.DEFAULT_PAGE_SIZE,
  ): Promise<PaginationBase<MBrand>> {
    const skipCount = Utils.CalculateSkipCount(page, pageSize);

    const raw = await BrandRepository.FindMany(pageSize, skipCount);

    const [totalCount, rawData] = raw;
    const totalPage: number = Utils.CalculateTotalPage(totalCount, pageSize);

    return {
      data: rawData.map((quote) => BrandTransformer.DMBrandTransformer(quote)),
      page,
      totalCount,
      totalPage,
    };
  }

  public static async Create(name: string, comment: NString): Promise<MBrand> {
    const raw = await BrandRepository.Create(name, comment);

    return BrandTransformer.DMBrandTransformer(raw);
  }

  public static async Delete(id: Id): Promise<MBrand> {
    const raw = await BrandRepository.Delete(id);

    return BrandTransformer.DMBrandTransformer(raw[1]);
  }

  public static async Update(id: MBrand['id'], name: string, comment: NString): Promise<MBrand> {
    const raw = await BrandRepository.Update(id, name, comment);

    return BrandTransformer.DMBrandTransformer(raw);
  }
}
