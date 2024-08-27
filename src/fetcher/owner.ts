'use client';

import { FOwner, GeneralResponse, Id, MOwner, VOwner } from '@/types';

export abstract class OwnerFetcher {
  public static async getAll(): Promise<GeneralResponse<VOwner[]>> {
    const res = await fetch('/api/owner');

    const data = (await res.json()) as GeneralResponse<VOwner[]>;

    return data;
  }

  public static async create(payload: FOwner): Promise<GeneralResponse<VOwner>> {
    const res = await fetch('/api/owner', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VOwner>>;

    return data;
  }

  public static async delete(id: Id): Promise<GeneralResponse<VOwner>> {
    const res = await fetch('/api/owner/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VOwner>>;

    return data;
  }

  public static async update(payload: FOwner, id: MOwner['id']): Promise<GeneralResponse<VOwner>> {
    const res = await fetch('/api/owner/' + id, {
      body: JSON.stringify(payload),
      method: 'POST',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VOwner>>;

    return data;
  }
}
