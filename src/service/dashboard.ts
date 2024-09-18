import { AssetRepository } from '@/repository';
import { MDashboardAggregate } from '@/types';

export abstract class DashboardService {
  public static async FindAggregate(): Promise<MDashboardAggregate> {
    return await AssetRepository.FindAggregate();
  }
}
