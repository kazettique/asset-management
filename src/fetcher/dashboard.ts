'use client';

import { ofetch } from 'ofetch';

import { GeneralResponse, VDashboardAggregate, VDashboardCalendar } from '@/types';

import { FetchOptionFactory } from './factory';

const API_URL: string = 'dashboard';

export abstract class DashboardFetcher {
  public static async FindAggregate(): Promise<GeneralResponse<VDashboardAggregate>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindAggregate.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VDashboardAggregate>>(API_URL, fetchOption);
  }

  public static async FindCalendar(currentDate: Date): Promise<GeneralResponse<VDashboardCalendar>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindAggregate.name,
      apiType: 'INTERNAL',
      method: 'GET',
      query: { currentDate: currentDate.toDateString() },
    });

    return await ofetch<GeneralResponse<VDashboardCalendar>>(API_URL, fetchOption);
  }
}
