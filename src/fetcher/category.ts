'use client';

import { FCategory, GeneralResponse, Id, MCategory, VCategory } from '@/types';

export abstract class CategoryFetcher {
  public static async getAllCategory(): Promise<GeneralResponse<VCategory[]>> {
    const res = await fetch('/api/category');

    const data = (await res.json()) as GeneralResponse<VCategory[]>;

    return data;
  }

  public static async createCategory(payload: FCategory): Promise<GeneralResponse<VCategory>> {
    const res = await fetch('/api/category', { body: JSON.stringify(payload), method: 'POST' });

    const data = (await res.json()) as Promise<GeneralResponse<VCategory>>;

    return data;
  }

  public static async deleteCategory(id: Id): Promise<GeneralResponse<VCategory>> {
    const res = await fetch('/api/category/' + id, { method: 'DELETE' });

    const data = (await res.json()) as Promise<GeneralResponse<VCategory>>;

    return data;
  }

  public static async updateCategory(payload: FCategory, id: MCategory['id']): Promise<GeneralResponse<VCategory>> {
    const res = await fetch('/api/category/' + id, {
      body: JSON.stringify(payload),
      method: 'POST',
    });

    const data = (await res.json()) as Promise<GeneralResponse<VCategory>>;

    return data;
  }
}
