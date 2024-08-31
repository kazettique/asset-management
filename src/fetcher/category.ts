'use client';

import { backendImplements } from '@/decorator';
import { FCategory, GeneralResponse, Id, MCategory, VCategory } from '@/types';

@backendImplements()
export abstract class CategoryFetcher {
  public static async FindAll(): Promise<GeneralResponse<VCategory[]>> {
    const res = await fetch('/api/setting/category');

    const data = (await res.json()) as GeneralResponse<VCategory[]>;

    return data;
  }

  public static async Find(id: Id): Promise<GeneralResponse<VCategory>> {
    const res = await fetch('/api/setting/category/' + id);

    const data = (await res.json()) as GeneralResponse<VCategory>;

    return data;
  }

  public static async Create(payload: FCategory): Promise<GeneralResponse<VCategory>> {
    const res = await fetch('/api/setting/category', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VCategory>>;

    return data;
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VCategory>> {
    const res = await fetch('/api/setting/category/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VCategory>>;

    return data;
  }

  public static async Update(payload: FCategory, id: MCategory['id']): Promise<GeneralResponse<VCategory>> {
    const res = await fetch('/api/setting/category/' + id, {
      body: JSON.stringify(payload),
      method: 'POST',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VCategory>>;

    return data;
  }
}
