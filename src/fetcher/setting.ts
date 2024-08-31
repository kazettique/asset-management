'use client';

import { GeneralResponse, VSetting } from '@/types';

export abstract class SettingFetcher {
  public static async FindAll(): Promise<GeneralResponse<VSetting>> {
    const res = await fetch('/api/setting');

    const data = (await res.json()) as GeneralResponse<VSetting>;

    return data;
  }
}
