import { OwnershipHistoryRepository } from '@/repository';
import { OwnershipHistoryTransformer } from '@/transformer';
import { Id, MOwnershipHistory } from '@/types';

export abstract class OwnershipHistoryService {
  public static async FindAll(): Promise<MOwnershipHistory[]> {
    const raw = await OwnershipHistoryRepository.FindAll();

    return raw.map((history) => OwnershipHistoryTransformer.DMOwnershipHistoryTransformer(history));
  }

  public static async FindMany(assetIds: Id[], ownerIds: Id[]): Promise<MOwnershipHistory[]> {
    const raw = await OwnershipHistoryRepository.FindMany(assetIds, ownerIds);

    return raw.map((history) => OwnershipHistoryTransformer.DMOwnershipHistoryTransformer(history));
  }

  public static async Create(assetId: Id, ownerId: Id, startDate: Date): Promise<MOwnershipHistory> {
    const raw = await OwnershipHistoryRepository.Create(assetId, ownerId, startDate);

    return OwnershipHistoryTransformer.DMOwnershipHistoryTransformer(raw);
  }
}
