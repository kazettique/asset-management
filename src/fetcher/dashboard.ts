'use client';

import { GeneralResponse, VDashboardAggregate } from '@/types';

export abstract class DashboardFetcher {
  public static async FindAggregate(): Promise<GeneralResponse<VDashboardAggregate>> {
    const res = await fetch('/api/dashboard');

    const data = (await res.json()) as GeneralResponse<VDashboardAggregate>;

    return data;
  }
}
