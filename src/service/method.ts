import { MethodType } from '@prisma/client';

import { CommonConstant } from '@/constant';
import { MethodRepository } from '@/repository';
import { Id, MMethod, NString, NType, PaginationBase } from '@/types';

export abstract class MethodService {
  public static async FindAll(): Promise<MMethod[]> {
    return await MethodRepository.FindAll();
  }

  public static async Find(id: Id): Promise<NType<MMethod>> {
    return await MethodRepository.Find(id);
  }

  public static async FindMany(
    page: number = CommonConstant.DEFAULT_PAGE,
    pageSize: number = CommonConstant.DEFAULT_PAGE_SIZE,
  ): Promise<PaginationBase<MMethod>> {
    return await MethodRepository.FindMany(page, pageSize);
  }

  public static async Create(name: string, type: MethodType, comment: NString): Promise<MMethod> {
    return await MethodRepository.Create(name, type, comment);
  }

  public static async Delete(id: Id): Promise<MMethod> {
    return await MethodRepository.Delete(id);
  }

  public static async Update(id: MMethod['id'], name: string, type: MethodType, comment: NString): Promise<MMethod> {
    return await MethodRepository.Update(id, name, type, comment);
  }
}
