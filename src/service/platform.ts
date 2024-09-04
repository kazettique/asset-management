import { Prisma } from '@prisma/client';

import { backendImplements } from '@/decorator';
import { PlatformRepository } from '@/repository';
import { Id, MPlace, NType, PPlace } from '@/types';

@backendImplements()
export abstract class PlatformService {
  public static async FindAll(): Promise<MPlace[]> {
    return await PlatformRepository.FindAll();
  }

  public static async Find(id: Id): Promise<NType<MPlace>> {
    return await PlatformRepository.Find(id);
  }

  public static async Create(payload: PPlace): Promise<MPlace> {
    return await PlatformRepository.Create(payload);
  }

  public static async CreateMany(payload: PPlace[]): Promise<Prisma.BatchPayload> {
    return await PlatformRepository.CreateMany(payload);
  }

  public static async Delete(id: Id): Promise<MPlace> {
    return await PlatformRepository.Delete(id);
  }

  public static async Update(payload: PPlace, id: MPlace['id']): Promise<MPlace> {
    return await PlatformRepository.Update(payload, id);
  }
}
