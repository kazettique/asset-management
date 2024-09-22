import { AssetRepository } from '@/repository';
import { MDashboardAggregate, MDashboardCalendar } from '@/types';

export abstract class DashboardService {
  public static async FindAggregate(): Promise<MDashboardAggregate> {
    return await AssetRepository.FindAggregate();
  }

  public static async FindAssetInMonthInterval(currentDate: Date): Promise<MDashboardCalendar> {
    return await AssetRepository.FindAssetInMonthInterval(currentDate);
  }
}
