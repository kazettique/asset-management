import { OwnerRepository } from '@/repository';
import { Id, MOwner, NType, ROwner } from '@/types';

export abstract class OwnerService {
  public static async getAll(): Promise<MOwner[]> {
    return await OwnerRepository.getAll();
  }

  public static async get(id: Id): Promise<NType<MOwner>> {
    return await OwnerRepository.get(id);
  }

  public static async create(payload: ROwner): Promise<MOwner> {
    return await OwnerRepository.create(payload);
  }

  public static async delete(id: Id): Promise<MOwner> {
    return await OwnerRepository.delete(id);
  }

  public static async update(payload: ROwner, id: MOwner['id']): Promise<MOwner> {
    return await OwnerRepository.update(payload, id);
  }
}
