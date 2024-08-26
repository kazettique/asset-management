'use client';

import { FBrand, GeneralResponse, Id, MBrand, VBrand } from '@/types';

export abstract class BrandFetcher {
  public static async getAllBrand(): Promise<GeneralResponse<VBrand[]>> {
    const res = await fetch('/api/brand');

    const data = (await res.json()) as GeneralResponse<VBrand[]>;

    return data;
  }

  public static async createBrand(payload: FBrand): Promise<GeneralResponse<VBrand>> {
    const res = await fetch('/api/brand', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VBrand>>;

    return data;
  }

  public static async deleteBrand(id: Id): Promise<GeneralResponse<VBrand>> {
    const res = await fetch('/api/brand/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VBrand>>;

    return data;
  }

  public static async updateBrand(payload: FBrand, id: MBrand['id']): Promise<GeneralResponse<VBrand>> {
    const res = await fetch('/api/brand/' + id, {
      body: JSON.stringify(payload),
      method: 'POST',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VBrand>>;

    return data;
  }
}
