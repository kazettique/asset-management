import { CategoryRepository } from '@/repository';
import { Id, MCategory, NType, RCategory } from '@/types';

export abstract class CategoryService {
  public static async getAll(): Promise<MCategory[]> {
    return await CategoryRepository.getAll();
  }

  public static async get(id: Id): Promise<NType<MCategory>> {
    return await CategoryRepository.get(id);
  }

  public static async create(payload: RCategory): Promise<MCategory> {
    return await CategoryRepository.create(payload);
  }

  public static async delete(id: Id): Promise<MCategory> {
    return await CategoryRepository.delete(id);
  }

  public static async update(payload: RCategory, id: MCategory['id']): Promise<MCategory> {
    return await CategoryRepository.update(payload, id);
  }
}
