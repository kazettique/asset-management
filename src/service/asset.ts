import { Prisma } from '@prisma/client';

import { backendImplements } from '@/decorator';
import { AssetRepository } from '@/repository';
import { Id, MAsset, NType, PAsset } from '@/types';

@backendImplements()
export abstract class AssetService {
  public static async FindAll(): Promise<MAsset[]> {
    return await AssetRepository.FindAll();
  }

  public static async Find(id: Id): Promise<NType<MAsset>> {
    return await AssetRepository.Find(id);
  }

  public static async Create(payload: PAsset): Promise<MAsset> {
    return await AssetRepository.Create(payload);
  }

  public static async CreateMany(payload: PAsset[]): Promise<Prisma.BatchPayload> {
    return await AssetRepository.CreateMany(payload);
  }

  public static async Delete(id: Id): Promise<MAsset> {
    return await AssetRepository.Delete(id);
  }

  public static async Update(payload: PAsset, id: MAsset['id']): Promise<MAsset> {
    return await AssetRepository.Update(payload, id);
  }
}
