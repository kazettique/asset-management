import { backendImplements } from '@/decorator';
import { BrandRepository } from '@/repository';
import { Id, MBrand, NType, RBrand } from '@/types';

@backendImplements()
export abstract class BrandService {
  public static async FindAll(): Promise<MBrand[]> {
    return await BrandRepository.FindAll();
  }

  public static async Find(id: Id): Promise<NType<MBrand>> {
    return await BrandRepository.Find(id);
  }

  public static async Create(payload: RBrand): Promise<MBrand> {
    return await BrandRepository.Create(payload);
  }

  public static async Delete(id: Id): Promise<MBrand> {
    return await BrandRepository.Delete(id);
  }

  public static async Update(payload: RBrand, id: MBrand['id']): Promise<MBrand> {
    return await BrandRepository.Update(payload, id);
  }
}
