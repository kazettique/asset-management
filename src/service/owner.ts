import { OwnerRepository } from '@/repository';
import { Id, MOwner, NString, NType } from '@/types';

export abstract class OwnerService {
  public static async FindAll(): Promise<MOwner[]> {
    return await OwnerRepository.FindAll();
  }

  public static async Find(id: Id): Promise<NType<MOwner>> {
    return await OwnerRepository.Find(id);
  }

  public static async Create(name: string, comment: NString): Promise<MOwner> {
    return await OwnerRepository.Create(name, comment);
  }

  public static async Delete(id: Id): Promise<MOwner> {
    return await OwnerRepository.Delete(id);
  }

  public static async Update(id: MOwner['id'], name: string, comment: NString): Promise<MOwner> {
    return await OwnerRepository.Update(id, name, comment);
  }
}
