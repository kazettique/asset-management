'use client';

import { GeneralResponse, VDashboardAggregate, VDashboardCalendar } from '@/types';

export abstract class DashboardFetcher {
  public static async FindAggregate(): Promise<GeneralResponse<VDashboardAggregate>> {
    const res = await fetch('/api/dashboard');

    const data = (await res.json()) as GeneralResponse<VDashboardAggregate>;

    return data;
  }

  public static async FindCalendar(currentDate: Date): Promise<GeneralResponse<VDashboardCalendar>> {
    const res = await fetch(
      '/api/dashboard/calendar?' + new URLSearchParams({ currentDate: currentDate.toDateString() }).toString(),
    );

    const data = (await res.json()) as GeneralResponse<VDashboardCalendar>;

    return data;
  }
}
