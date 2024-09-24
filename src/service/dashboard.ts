import { AssetRepository } from '@/repository';
import { DashboardTransformer } from '@/transformer';
import { MDashboardAggregate, MDashboardCalendar } from '@/types';

export abstract class DashboardService {
  public static async FindAggregate(): Promise<MDashboardAggregate> {
    const raw = await AssetRepository.FindAggregate();

    return DashboardTransformer.DMDashboardAggregateTransformer(raw);
  }

  public static async FindAssetInMonthInterval(currentDate: Date): Promise<MDashboardCalendar> {
    const raw = await AssetRepository.FindAssetInMonthInterval(currentDate);

    return DashboardTransformer.DMDashboardCalendarTransformer(raw);
  }
}
