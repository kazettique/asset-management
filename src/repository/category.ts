import { Prisma } from '@prisma/client';

import { db } from '@/lib/db';
import { DBCreateCategory, Id, MCategory, Name, NString, NType, VCategory } from '@/type';

export abstract class CategoryRepository {
  public static async getAllCategory(): Promise<MCategory[]> {
    return await db.category.findMany({
      select: {
        comment: true,
        id: true,
        name: true,
      },
    });
  }

  public static async getCategory(id: Id): Promise<NType<MCategory>> {
    return await db.category.findUnique({
      select: {
        comment: true,
        id: true,
        name: true,
      },
      where: { id },
    });
  }

  public static async createCategory(payload: DBCreateCategory) {
    return await db.category.create({
      data: {
        ...payload,
        // todo: type workaround
        // ref: https://github.com/prisma/prisma/issues/9247
        name: payload.name as Prisma.JsonObject,
      },
    });
  }

  public static async deleteCategory(id: Id) {
    return await db.category.delete({
      where: { id },
    });
  }

  public static async updateCategory(payload: MCategory) {
    return await db.category.update({
      data: {
        comment: payload.comment,
        name: payload.name as Prisma.JsonObject,
      },
      where: { id: payload.id },
    });
  }
}
