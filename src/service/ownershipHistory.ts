import { OwnershipHistoryRepository } from '@/repository';
import { Id, MOwnershipHistory } from '@/types';

export abstract class OwnershipHistoryService {
  public static async FindAll(): Promise<MOwnershipHistory[]> {
    return await OwnershipHistoryRepository.FindAll();
  }

  public static async FindMany(assetIds: Id[], ownerIds: Id[]): Promise<MOwnershipHistory[]> {
    return await OwnershipHistoryRepository.FindMany(assetIds, ownerIds);
  }

  public static async Create(assetId: Id, ownerId: Id, startDate: Date): Promise<MOwnershipHistory> {
    return await OwnershipHistoryRepository.Create(assetId, ownerId, startDate);
  }
}
