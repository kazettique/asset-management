'use client';

import { FBrand, GeneralResponse, Id, MBrand, VBrand } from '@/types';

export abstract class CategoryFetcher {
  public static async getAllCategory(): Promise<GeneralResponse<VBrand[]>> {
    const res = await fetch('/api/category');

    const data = (await res.json()) as GeneralResponse<VBrand[]>;

    return data;
  }

  public static async createCategory(payload: FBrand): Promise<GeneralResponse<VBrand>> {
    const res = await fetch('/api/category', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VBrand>>;

    return data;
  }

  public static async deleteCategory(id: Id): Promise<GeneralResponse<VBrand>> {
    const res = await fetch('/api/category/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VBrand>>;

    return data;
  }

  public static async updateCategory(payload: FBrand, id: MBrand['id']): Promise<GeneralResponse<VBrand>> {
    const res = await fetch('/api/category/' + id, {
      body: JSON.stringify(payload),
      method: 'POST',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VBrand>>;

    return data;
  }
}
