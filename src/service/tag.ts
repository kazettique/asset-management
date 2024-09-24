import { CommonConstant } from '@/constant';
import { TagRepository } from '@/repository';
import { Id, MTag, NString, NType, PaginationBase } from '@/types';

export abstract class TagService {
  public static async FindAll(): Promise<MTag[]> {
    return await TagRepository.FindAll();
  }

  public static async Find(id: Id): Promise<NType<MTag>> {
    return await TagRepository.Find(id);
  }

  public static async FindMany(
    page: number = CommonConstant.DEFAULT_PAGE,
    pageSize: number = CommonConstant.DEFAULT_PAGE_SIZE,
  ): Promise<PaginationBase<MTag>> {
    return await TagRepository.FindMany(page, pageSize);
  }

  public static async Create(name: string, comment: NString): Promise<MTag> {
    return await TagRepository.Create(name, comment);
  }

  public static async Delete(id: Id): Promise<MTag> {
    return await TagRepository.Delete(id);
  }

  public static async Update(id: MTag['id'], name: string, comment: NString): Promise<MTag> {
    return await TagRepository.Update(id, name, comment);
  }
}
