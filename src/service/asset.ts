import { AssetRepository } from '@/repository';
import { Id, MAsset, NType, RAsset } from '@/types';

export abstract class AssetService {
  public static async getAll(): Promise<MAsset[]> {
    return await AssetRepository.getAll();
  }

  public static async get(id: Id): Promise<NType<MAsset>> {
    return await AssetRepository.get(id);
  }

  public static async create(payload: RAsset): Promise<MAsset> {
    return await AssetRepository.create(payload);
  }

  public static async delete(id: Id): Promise<MAsset> {
    return await AssetRepository.delete(id);
  }

  public static async update(payload: RAsset, id: MAsset['id']): Promise<MAsset> {
    return await AssetRepository.update(payload, id);
  }
}
