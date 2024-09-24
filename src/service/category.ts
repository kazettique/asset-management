import { CommonConstant } from '@/constant';
import { CategoryRepository } from '@/repository';
import { Id, MCategory, NString, NType, PaginationBase } from '@/types';

export abstract class CategoryService {
  public static async FindAll(): Promise<MCategory[]> {
    return await CategoryRepository.FindAll();
  }

  public static async Find(id: Id): Promise<NType<MCategory>> {
    return await CategoryRepository.Find(id);
  }

  public static async FindMany(
    page: number = CommonConstant.DEFAULT_PAGE,
    pageSize: number = CommonConstant.DEFAULT_PAGE_SIZE,
  ): Promise<PaginationBase<MCategory>> {
    return await CategoryRepository.FindMany(page, pageSize);
  }

  public static async Create(name: string, comment: NString): Promise<MCategory> {
    return await CategoryRepository.Create(name, comment);
  }

  public static async Delete(id: Id): Promise<MCategory> {
    return await CategoryRepository.Delete(id);
  }

  public static async Update(id: MCategory['id'], name: string, comment: NString): Promise<MCategory> {
    return await CategoryRepository.Update(id, name, comment);
  }
}
