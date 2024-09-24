import { MethodType } from '@prisma/client';

import { CommonConstant } from '@/constant';
import { MethodRepository } from '@/repository';
import { MethodTransformer } from '@/transformer';
import { Id, MMethod, NString, NType, PaginationBase } from '@/types';
import { Utils } from '@/utils';

export abstract class MethodService {
  public static async FindAll(): Promise<MMethod[]> {
    const raw = await MethodRepository.FindAll();

    return raw.map((category) => MethodTransformer.DMMethodTransformer(category));
  }

  public static async Find(id: Id): Promise<NType<MMethod>> {
    const raw = await MethodRepository.Find(id);

    if (raw === null) {
      return raw;
    } else {
      return MethodTransformer.DMMethodTransformer(raw);
    }
  }

  public static async FindMany(
    page: number = CommonConstant.DEFAULT_PAGE,
    pageSize: number = CommonConstant.DEFAULT_PAGE_SIZE,
  ): Promise<PaginationBase<MMethod>> {
    const skipCount = Utils.CalculateSkipCount(page, pageSize);

    const raw = await MethodRepository.FindMany(pageSize, skipCount);

    const [totalCount, rawData] = raw;
    const totalPage: number = Utils.CalculateTotalPage(totalCount, pageSize);

    return {
      data: rawData.map((quote) => MethodTransformer.DMMethodTransformer(quote)),
      page,
      totalCount,
      totalPage,
    };
  }

  public static async Create(name: string, type: MethodType, comment: NString): Promise<MMethod> {
    const raw = await MethodRepository.Create(name, type, comment);

    return MethodTransformer.DMMethodTransformer(raw);
  }

  public static async Delete(id: Id): Promise<MMethod> {
    const raw = await MethodRepository.Delete(id);

    return MethodTransformer.DMMethodTransformer(raw[1]);
  }

  public static async Update(id: MMethod['id'], name: string, type: MethodType, comment: NString): Promise<MMethod> {
    const raw = await MethodRepository.Update(id, name, type, comment);

    return MethodTransformer.DMMethodTransformer(raw);
  }
}
