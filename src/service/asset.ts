import { backendImplements } from '@/decorator';
import { AssetRepository } from '@/repository';
import { Id, MAsset, NType, RAsset } from '@/types';

@backendImplements()
export abstract class AssetService {
  public static async FindAll(): Promise<MAsset[]> {
    return await AssetRepository.FindAll();
  }

  public static async Find(id: Id): Promise<NType<MAsset>> {
    return await AssetRepository.Find(id);
  }

  public static async Create(payload: RAsset): Promise<MAsset> {
    return await AssetRepository.Create(payload);
  }

  public static async Delete(id: Id): Promise<MAsset> {
    return await AssetRepository.Delete(id);
  }

  public static async Update(payload: RAsset, id: MAsset['id']): Promise<MAsset> {
    return await AssetRepository.Update(payload, id);
  }
}
