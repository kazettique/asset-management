'use client';

import { backendImplements } from '@/decorator';
import { FOwner, GeneralResponse, Id, MOwner, VOwner } from '@/types';

@backendImplements()
export abstract class OwnerFetcher {
  public static async FindAll(): Promise<GeneralResponse<VOwner[]>> {
    const res = await fetch('/api/setting/owner');

    const data = (await res.json()) as GeneralResponse<VOwner[]>;

    return data;
  }

  public static async Find(id: Id): Promise<GeneralResponse<VOwner>> {
    const res = await fetch('/api/setting/owner/' + id);

    const data = (await res.json()) as GeneralResponse<VOwner>;

    return data;
  }

  public static async Create(payload: FOwner): Promise<GeneralResponse<VOwner>> {
    const res = await fetch('/api/setting/owner', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VOwner>>;

    return data;
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VOwner>> {
    const res = await fetch('/api/setting/owner/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VOwner>>;

    return data;
  }

  public static async Update(payload: FOwner, id: MOwner['id']): Promise<GeneralResponse<VOwner>> {
    const res = await fetch('/api/setting/owner/' + id, {
      body: JSON.stringify(payload),
      method: 'POST',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VOwner>>;

    return data;
  }
}
