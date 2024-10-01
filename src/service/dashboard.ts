import { CurrencyCode } from 'currency-codes-ts/dist/types';

import { AssetRepository } from '@/repository';
import { DashboardTransformer } from '@/transformer';
import { MDashboardAggregate, MDashboardCalendar, MForex, NType, SettingKey } from '@/types';

import { ForexService } from './forex';
import { SettingService } from './setting';

export abstract class DashboardService {
  public static async FindAggregate(): Promise<MDashboardAggregate> {
    const raw = await AssetRepository.FindAggregate();

    const displayForexSetting = await SettingService.FindByKey(SettingKey.DISPLAY_FOREX);

    let displayForex: NType<MForex> = null;
    if (displayForexSetting) {
      displayForex = await ForexService.FindOrCreate(displayForexSetting.value as CurrencyCode);
    }

    const data = DashboardTransformer.DMDashboardAggregateTransformer(raw);

    if (displayForex) {
      return DashboardTransformer.MDashboardCalculatePriceTransformer(data, displayForex);
    } else {
      return data;
    }
  }

  public static async FindAssetInMonthInterval(currentDate: Date): Promise<MDashboardCalendar> {
    const raw = await AssetRepository.FindAssetInMonthInterval(currentDate);

    return DashboardTransformer.DMDashboardCalendarTransformer(raw);
  }
}
