'use client';

import { backendImplements } from '@/decorator';
import { FBrand, GeneralResponse, Id, MBrand, VBrand } from '@/types';

@backendImplements()
export abstract class BrandFetcher {
  public static async FindAll(): Promise<GeneralResponse<VBrand[]>> {
    const res = await fetch('/api/setting/brand');

    const data = (await res.json()) as GeneralResponse<VBrand[]>;

    return data;
  }

  public static async Find(id: Id): Promise<GeneralResponse<VBrand>> {
    const res = await fetch('/api/setting/' + id);

    const data = (await res.json()) as GeneralResponse<VBrand>;

    return data;
  }

  public static async Create(payload: FBrand): Promise<GeneralResponse<VBrand>> {
    const res = await fetch('/api/setting/brand', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VBrand>>;

    return data;
  }

  public static async Delete(id: Id): Promise<GeneralResponse<VBrand>> {
    const res = await fetch('/api/setting/brand/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VBrand>>;

    return data;
  }

  public static async Update(payload: FBrand, id: MBrand['id']): Promise<GeneralResponse<VBrand>> {
    const res = await fetch('/api/setting/brand/' + id, {
      body: JSON.stringify(payload),
      method: 'POST',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VBrand>>;

    return data;
  }
}
