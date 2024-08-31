import { PlaceRepository } from '@/repository';
import { Id, MPlace, NType, RPlace } from '@/types';

export abstract class PlaceService {
  public static async getAll(): Promise<MPlace[]> {
    return await PlaceRepository.getAll();
  }

  public static async get(id: Id): Promise<NType<MPlace>> {
    return await PlaceRepository.get(id);
  }

  public static async create(payload: RPlace): Promise<MPlace> {
    return await PlaceRepository.create(payload);
  }

  public static async delete(id: Id): Promise<MPlace> {
    return await PlaceRepository.delete(id);
  }

  public static async update(payload: RPlace, id: MPlace['id']): Promise<MPlace> {
    return await PlaceRepository.update(payload, id);
  }
}
