import { CommonConstant } from '@/constant';
import { CategoryRepository } from '@/repository';
import { CategoryTransformer } from '@/transformer';
import { Id, MCategory, NString, NType, PaginationBase } from '@/types';
import { Utils } from '@/utils';

export abstract class CategoryService {
  public static async FindAll(): Promise<MCategory[]> {
    const raw = await CategoryRepository.FindAll();

    return raw.map((category) => CategoryTransformer.DMCategoryTransformer(category));
  }

  public static async Find(id: Id): Promise<NType<MCategory>> {
    const raw = await CategoryRepository.Find(id);

    if (raw === null) {
      return raw;
    } else {
      return CategoryTransformer.DMCategoryTransformer(raw);
    }
  }

  public static async FindMany(
    page: number = CommonConstant.DEFAULT_PAGE,
    pageSize: number = CommonConstant.DEFAULT_PAGE_SIZE,
  ): Promise<PaginationBase<MCategory>> {
    const skipCount = Utils.CalculateSkipCount(page, pageSize);

    const raw = await CategoryRepository.FindMany(pageSize, skipCount);

    const [totalCount, rawData] = raw;
    const totalPage: number = Utils.CalculateTotalPage(totalCount, pageSize);

    return {
      data: rawData.map((quote) => CategoryTransformer.DMCategoryTransformer(quote)),
      page,
      totalCount,
      totalPage,
    };
  }

  public static async Create(name: string, comment: NString): Promise<MCategory> {
    const raw = await CategoryRepository.Create(name, comment);

    return CategoryTransformer.DMCategoryTransformer(raw);
  }

  public static async Delete(id: Id): Promise<MCategory> {
    const raw = await CategoryRepository.Delete(id);

    return CategoryTransformer.DMCategoryTransformer(raw[1]);
  }

  public static async Update(id: MCategory['id'], name: string, comment: NString): Promise<MCategory> {
    const raw = await CategoryRepository.Update(id, name, comment);

    return CategoryTransformer.DMCategoryTransformer(raw);
  }
}
