import { backendImplements } from '@/decorator';
import { PlaceRepository } from '@/repository';
import { Id, MPlace, NType, RPlace } from '@/types';

@backendImplements()
export abstract class PlaceService {
  public static async FindAll(): Promise<MPlace[]> {
    return await PlaceRepository.FindAll();
  }

  public static async Find(id: Id): Promise<NType<MPlace>> {
    return await PlaceRepository.Find(id);
  }

  public static async Create(payload: RPlace): Promise<MPlace> {
    return await PlaceRepository.Create(payload);
  }

  public static async Delete(id: Id): Promise<MPlace> {
    return await PlaceRepository.Delete(id);
  }

  public static async Update(payload: RPlace, id: MPlace['id']): Promise<MPlace> {
    return await PlaceRepository.Update(payload, id);
  }
}
