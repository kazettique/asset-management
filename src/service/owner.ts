import { backendImplements } from '@/decorator';
import { OwnerRepository } from '@/repository';
import { Id, MOwner, NType, POwner } from '@/types';

@backendImplements()
export abstract class OwnerService {
  public static async FindAll(): Promise<MOwner[]> {
    return await OwnerRepository.FindAll();
  }

  public static async Find(id: Id): Promise<NType<MOwner>> {
    return await OwnerRepository.Find(id);
  }

  public static async Create(payload: POwner): Promise<MOwner> {
    return await OwnerRepository.Create(payload);
  }

  public static async Delete(id: Id): Promise<MOwner> {
    return await OwnerRepository.Delete(id);
  }

  public static async Update(payload: POwner, id: MOwner['id']): Promise<MOwner> {
    return await OwnerRepository.Update(payload, id);
  }
}
