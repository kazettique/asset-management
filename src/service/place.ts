import { PlaceRepository } from '@/repository';
import { Id, MPlace, NString, NType } from '@/types';

export abstract class PlaceService {
  public static async FindAll(): Promise<MPlace[]> {
    return await PlaceRepository.FindAll();
  }

  public static async Find(id: Id): Promise<NType<MPlace>> {
    return await PlaceRepository.Find(id);
  }

  public static async Create(name: string, comment: NString): Promise<MPlace> {
    return await PlaceRepository.Create(name, comment);
  }

  public static async Delete(id: Id): Promise<MPlace> {
    return await PlaceRepository.Delete(id);
  }

  public static async Update(id: MPlace['id'], name: string, comment: NString): Promise<MPlace> {
    return await PlaceRepository.Update(id, name, comment);
  }
}
