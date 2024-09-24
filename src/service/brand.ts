import { CommonConstant } from '@/constant';
import { BrandRepository } from '@/repository';
import { Id, MBrand, NString, NType, PaginationBase } from '@/types';

export abstract class BrandService {
  public static async FindAll(): Promise<MBrand[]> {
    return await BrandRepository.FindAll();
  }

  public static async Find(id: Id): Promise<NType<MBrand>> {
    return await BrandRepository.Find(id);
  }

  public static async FindMany(
    page: number = CommonConstant.DEFAULT_PAGE,
    pageSize: number = CommonConstant.DEFAULT_PAGE_SIZE,
  ): Promise<PaginationBase<MBrand>> {
    return await BrandRepository.FindMany(page, pageSize);
  }

  public static async Create(name: string, comment: NString): Promise<MBrand> {
    return await BrandRepository.Create(name, comment);
  }

  public static async Delete(id: Id): Promise<MBrand> {
    return await BrandRepository.Delete(id);
  }

  public static async Update(id: MBrand['id'], name: string, comment: NString): Promise<MBrand> {
    return await BrandRepository.Update(id, name, comment);
  }
}
