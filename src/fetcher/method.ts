'use client';

import { backendImplements } from '@/decorator';
import { FMethod, GeneralResponse, Id, MMethod, VMethod } from '@/types';

@backendImplements()
export abstract class MethodFetcher {
  public static async FindAll(): Promise<GeneralResponse<VMethod[]>> {
    const res = await fetch('/api/setting/method');

    const data = (await res.json()) as GeneralResponse<VMethod[]>;

    return data;
  }

  public static async Find(id: Id): Promise<GeneralResponse<VMethod>> {
    const res = await fetch('/api/setting/method/' + id);

    const data = (await res.json()) as GeneralResponse<VMethod>;

    return data;
  }

  public static async Create(payload: FMethod): Promise<GeneralResponse<VMethod>> {
    const res = await fetch('/api/setting/method', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VMethod>>;

    return data;
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VMethod>> {
    const res = await fetch('/api/setting/method/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VMethod>>;

    return data;
  }

  public static async Update(payload: FMethod, id: MMethod['id']): Promise<GeneralResponse<VMethod>> {
    const res = await fetch('/api/setting/method/' + id, {
      body: JSON.stringify(payload),
      method: 'POST',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VMethod>>;

    return data;
  }
}
