import { CommonConstant } from '@/constant';
import { PlatformRepository } from '@/repository';
import { PlatformTransformer } from '@/transformer';
import { Id, MPlatform, NString, NType, PaginationBase } from '@/types';
import { Utils } from '@/utils';

export abstract class PlatformService {
  public static async FindAll(): Promise<MPlatform[]> {
    const raw = await PlatformRepository.FindAll();

    return raw.map((Platform) => PlatformTransformer.DMPlatformTransformer(Platform));
  }

  public static async Find(id: Id): Promise<NType<MPlatform>> {
    const raw = await PlatformRepository.Find(id);

    if (raw === null) {
      return raw;
    } else {
      return PlatformTransformer.DMPlatformTransformer(raw);
    }
  }

  public static async FindMany(
    page: number = CommonConstant.DEFAULT_PAGE,
    pageSize: number = CommonConstant.DEFAULT_PAGE_SIZE,
  ): Promise<PaginationBase<MPlatform>> {
    const skipCount = Utils.CalculateSkipCount(page, pageSize);

    const raw = await PlatformRepository.FindMany(pageSize, skipCount);

    const [totalCount, rawData] = raw;
    const totalPage: number = Utils.CalculateTotalPage(totalCount, pageSize);

    return {
      data: rawData.map((quote) => PlatformTransformer.DMPlatformTransformer(quote)),
      page,
      totalCount,
      totalPage,
    };
  }

  public static async Create(name: string, comment: NString): Promise<MPlatform> {
    const raw = await PlatformRepository.Create(name, comment);

    return PlatformTransformer.DMPlatformTransformer(raw);
  }

  public static async Delete(id: Id): Promise<MPlatform> {
    const raw = await PlatformRepository.Delete(id);

    return PlatformTransformer.DMPlatformTransformer(raw[1]);
  }

  public static async Update(id: MPlatform['id'], name: string, comment: NString): Promise<MPlatform> {
    const raw = await PlatformRepository.Update(id, name, comment);

    return PlatformTransformer.DMPlatformTransformer(raw);
  }
}
