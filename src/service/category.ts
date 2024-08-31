import { backendImplements } from '@/decorator';
import { CategoryRepository } from '@/repository';
import { Id, MCategory, NType, RCategory } from '@/types';

@backendImplements()
export abstract class CategoryService {
  public static async FindAll(): Promise<MCategory[]> {
    return await CategoryRepository.FindAll();
  }

  public static async Find(id: Id): Promise<NType<MCategory>> {
    return await CategoryRepository.Find(id);
  }

  public static async Create(payload: RCategory): Promise<MCategory> {
    return await CategoryRepository.Create(payload);
  }

  public static async Delete(id: Id): Promise<MCategory> {
    return await CategoryRepository.Delete(id);
  }

  public static async Update(payload: RCategory, id: MCategory['id']): Promise<MCategory> {
    return await CategoryRepository.Update(payload, id);
  }
}
