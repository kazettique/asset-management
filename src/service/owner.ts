import { CommonConstant } from '@/constant';
import { OwnerRepository } from '@/repository';
import { OwnerTransformer } from '@/transformer';
import { Id, MOwner, NString, NType, PaginationBase } from '@/types';
import { Utils } from '@/utils';

export abstract class OwnerService {
  public static async FindAll(): Promise<MOwner[]> {
    const raw = await OwnerRepository.FindAll();

    return raw.map((owner) => OwnerTransformer.DMOwnerTransformer(owner));
  }

  public static async Find(id: Id): Promise<NType<MOwner>> {
    const raw = await OwnerRepository.Find(id);

    if (raw === null) {
      return raw;
    } else {
      return OwnerTransformer.DMOwnerTransformer(raw);
    }
  }

  public static async FindMany(
    page: number = CommonConstant.DEFAULT_PAGE,
    pageSize: number = CommonConstant.DEFAULT_PAGE_SIZE,
  ): Promise<PaginationBase<MOwner>> {
    const skipCount = Utils.CalculateSkipCount(page, pageSize);

    const raw = await OwnerRepository.FindMany(pageSize, skipCount);

    const [totalCount, rawData] = raw;
    const totalPage: number = Utils.CalculateTotalPage(totalCount, pageSize);

    return {
      data: rawData.map((quote) => OwnerTransformer.DMOwnerTransformer(quote)),
      page,
      totalCount,
      totalPage,
    };
  }

  public static async Create(name: string, comment: NString): Promise<MOwner> {
    const raw = await OwnerRepository.Create(name, comment);

    return OwnerTransformer.DMOwnerTransformer(raw);
  }

  public static async Delete(id: Id): Promise<MOwner> {
    const raw = await OwnerRepository.Delete(id);

    return OwnerTransformer.DMOwnerTransformer(raw[1]);
  }

  public static async Update(id: MOwner['id'], name: string, comment: NString): Promise<MOwner> {
    const raw = await OwnerRepository.Update(id, name, comment);

    return OwnerTransformer.DMOwnerTransformer(raw);
  }
}
