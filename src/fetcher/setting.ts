'use client';

import { ofetch } from 'ofetch';

import { GeneralResponse, VSettingOptions } from '@/types';

import { FetchOptionFactory } from './factory';

const API_URL: string = 'setting';

export abstract class SettingFetcher {
  public static async FindAllOptions(): Promise<GeneralResponse<VSettingOptions>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindAllOptions.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VSettingOptions>>(`${API_URL}/options`, fetchOption);
  }

  public static async FindAll(): Promise<GeneralResponse<VSettingOptions>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindAll.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VSettingOptions>>(API_URL, fetchOption);
  }
}
