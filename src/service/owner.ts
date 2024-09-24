import { CommonConstant } from '@/constant';
import { OwnerRepository } from '@/repository';
import { Id, MOwner, NString, NType, PaginationBase } from '@/types';

export abstract class OwnerService {
  public static async FindAll(): Promise<MOwner[]> {
    return await OwnerRepository.FindAll();
  }

  public static async Find(id: Id): Promise<NType<MOwner>> {
    return await OwnerRepository.Find(id);
  }

  public static async FindMany(
    page: number = CommonConstant.DEFAULT_PAGE,
    pageSize: number = CommonConstant.DEFAULT_PAGE_SIZE,
  ): Promise<PaginationBase<MOwner>> {
    return await OwnerRepository.FindMany(page, pageSize);
  }

  public static async Create(name: string, comment: NString): Promise<MOwner> {
    return await OwnerRepository.Create(name, comment);
  }

  public static async Delete(id: Id): Promise<MOwner> {
    return await OwnerRepository.Delete(id);
  }

  public static async Update(id: MOwner['id'], name: string, comment: NString): Promise<MOwner> {
    return await OwnerRepository.Update(id, name, comment);
  }
}
