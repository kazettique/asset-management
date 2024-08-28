'use client';

import { FMethod, GeneralResponse, Id, MMethod, VMethod } from '@/types';

export abstract class MethodFetcher {
  public static async getAll(): Promise<GeneralResponse<VMethod[]>> {
    const res = await fetch('/api/setting/method');

    const data = (await res.json()) as GeneralResponse<VMethod[]>;

    return data;
  }

  public static async create(payload: FMethod): Promise<GeneralResponse<VMethod>> {
    const res = await fetch('/api/setting/method', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VMethod>>;

    return data;
  }

  public static async delete(id: Id): Promise<GeneralResponse<VMethod>> {
    const res = await fetch('/api/setting/method/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VMethod>>;

    return data;
  }

  public static async update(payload: FMethod, id: MMethod['id']): Promise<GeneralResponse<VMethod>> {
    const res = await fetch('/api/setting/method/' + id, {
      body: JSON.stringify(payload),
      method: 'POST',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VMethod>>;

    return data;
  }
}
