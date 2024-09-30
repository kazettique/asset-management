'use client';

import { ofetch } from 'ofetch';

import { FSetting, GeneralResponse, MSetting, VSetting, VSettingOptions } from '@/types';

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

  public static async FindAll(): Promise<GeneralResponse<VSetting[]>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.FindAll.name,
      apiType: 'INTERNAL',
      method: 'GET',
    });

    return await ofetch<GeneralResponse<VSetting[]>>(API_URL, fetchOption);
  }

  public static async Update(payload: FSetting, id: MSetting['id']): Promise<GeneralResponse<VSetting>> {
    const fetchOption = new FetchOptionFactory({
      apiName: this.Update.name,
      apiType: 'INTERNAL',
      body: payload,
      method: 'PUT',
    });

    return await ofetch<GeneralResponse<VSetting>>(`${API_URL}/${id}`, fetchOption);
  }
}
