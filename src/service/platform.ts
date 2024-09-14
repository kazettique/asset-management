import { PlatformRepository } from '@/repository';
import { Id, MPlace, NString, NType } from '@/types';

export abstract class PlatformService {
  public static async FindAll(): Promise<MPlace[]> {
    return await PlatformRepository.FindAll();
  }

  public static async Find(id: Id): Promise<NType<MPlace>> {
    return await PlatformRepository.Find(id);
  }

  public static async Create(name: string, comment: NString): Promise<MPlace> {
    return await PlatformRepository.Create(name, comment);
  }

  public static async Delete(id: Id): Promise<MPlace> {
    return await PlatformRepository.Delete(id);
  }

  public static async Update(id: MPlace['id'], name: string, comment: NString): Promise<MPlace> {
    return await PlatformRepository.Update(id, name, comment);
  }
}
