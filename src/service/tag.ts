import { CommonConstant } from '@/constant';
import { TagRepository } from '@/repository';
import { TagTransformer } from '@/transformer';
import { Id, MTag, NString, NType, PaginationBase } from '@/types';
import { Utils } from '@/utils';

export abstract class TagService {
  public static async FindAll(): Promise<MTag[]> {
    const raw = await TagRepository.FindAll();

    return raw.map((place) => TagTransformer.DMTagTransformer(place));
  }

  public static async Find(id: Id): Promise<NType<MTag>> {
    const raw = await TagRepository.Find(id);

    if (raw === null) {
      return raw;
    } else {
      return TagTransformer.DMTagTransformer(raw);
    }
  }

  public static async FindMany(
    page: number = CommonConstant.DEFAULT_PAGE,
    pageSize: number = CommonConstant.DEFAULT_PAGE_SIZE,
  ): Promise<PaginationBase<MTag>> {
    const skipCount = Utils.CalculateSkipCount(page, pageSize);

    const raw = await TagRepository.FindMany(pageSize, skipCount);

    const [totalCount, rawData] = raw;
    const totalPage: number = Utils.CalculateTotalPage(totalCount, pageSize);

    return {
      data: rawData.map((tag) => TagTransformer.DMTagTransformer(tag)),
      page,
      totalCount,
      totalPage,
    };
  }

  public static async Create(name: string, comment: NString): Promise<MTag> {
    const raw = await TagRepository.Create(name, comment);

    return TagTransformer.DMTagTransformer(raw);
  }

  public static async Delete(id: Id): Promise<MTag> {
    const raw = await TagRepository.Delete(id);

    return TagTransformer.DMTagTransformer(raw);
  }

  public static async Update(id: MTag['id'], name: string, comment: NString): Promise<MTag> {
    const raw = await TagRepository.Update(id, name, comment);

    return TagTransformer.DMTagTransformer(raw);
  }
}
