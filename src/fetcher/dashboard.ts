'use client';

import { backendImplements } from '@/decorator';
import { FBrand, GeneralResponse, Id, MBrand, VBrand } from '@/types';

export abstract class DashboardFetcher {
  public static async FindAggregate(): Promise<GeneralResponse<VBrand[]>> {
    const res = await fetch('/api/dashboard');

    const data = (await res.json()) as GeneralResponse<VBrand[]>;

    return data;
  }
}
