import { MethodRepository } from '@/repository';
import { Id, MMethod, NType, RMethod } from '@/types';

export abstract class MethodService {
  public static async getAll(): Promise<MMethod[]> {
    return await MethodRepository.getAll();
  }

  public static async get(id: Id): Promise<NType<MMethod>> {
    return await MethodRepository.get(id);
  }

  public static async create(payload: RMethod): Promise<MMethod> {
    return await MethodRepository.create(payload);
  }

  public static async delete(id: Id): Promise<MMethod> {
    return await MethodRepository.delete(id);
  }

  public static async update(payload: RMethod, id: MMethod['id']): Promise<MMethod> {
    return await MethodRepository.update(payload, id);
  }
}
