import { BrandRepository } from '@/repository';
import { Id, MBrand, NType, RBrand } from '@/types';

export abstract class BrandService {
  public static async getAll(): Promise<MBrand[]> {
    return await BrandRepository.getAll();
  }

  public static async get(id: Id): Promise<NType<MBrand>> {
    return await BrandRepository.get(id);
  }

  public static async create(payload: RBrand): Promise<MBrand> {
    return await BrandRepository.create(payload);
  }

  public static async delete(id: Id): Promise<MBrand> {
    return await BrandRepository.delete(id);
  }

  public static async update(payload: RBrand, id: MBrand['id']): Promise<MBrand> {
    return await BrandRepository.update(payload, id);
  }
}
