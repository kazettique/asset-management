'use client';

import { ofetch } from 'ofetch';

import { GeneralResponse, VSetting } from '@/types';

import { FetchOptionFactory } from './factory';

const API_URL: string = 'setting';

export abstract class SettingFetcher {
  public static async FindAll(): Promise<GeneralResponse<VSetting>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindAll.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VSetting>>(API_URL, fetchOption);
  }
}
