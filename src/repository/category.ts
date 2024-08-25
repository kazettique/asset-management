import { Prisma } from '@prisma/client';

import { db } from '@/lib/db';
import { DBCreateCategory, MCategory, Name, NString, VCategory } from '@/type';

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

  // public static async updateCategory(payload: MCategory) {
  //   return await db.category.update({
  //     data: {
  //       comment: payload.comment,
  //       name: payload.name,
  //     },
  //     where: { id: payload.id },
  //   });
  // }
}
