'use client';

import { GeneralResponse, Id, MCategory, RCreateCategory, VCategory } from '@/type';

export abstract class CategoryFetcher {
  public static async getAllCategory(): Promise<GeneralResponse<VCategory[]>> {
    const res = await fetch('/api/category');

    const data = (await res.json()) as GeneralResponse<VCategory[]>;

    return data;
  }

  // todo: fix any type
  public static async createCategory(payload: RCreateCategory): Promise<GeneralResponse<any>> {
    const res = await fetch('/api/category', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<any>>;

    return data;
  }

  // todo: abstract search params
  public static async deleteCategory(id: Id) {
    const res = await fetch('/api/category/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<any>>;

    return data;
  }
}
