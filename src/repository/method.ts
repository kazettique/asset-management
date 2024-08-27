import { db } from '@/lib/db';
import { MethodTransformer } from '@/transformer';
import { DMethod, Id, MMethod, NType, RMethod } from '@/types';

export abstract class MethodRepository {
  public static async getAll(): Promise<MMethod[]> {
    const rawData: DMethod[] = await db.method.findMany({
      select: {
        comment: true,
        id: true,
        name: true,
        type: true,
      },
    });

    const parsedData = rawData.map((category) => MethodTransformer.DMethodTransformer(category));

    return parsedData;
  }

  public static async get(id: Id): Promise<NType<MMethod>> {
    const rawData: NType<DMethod> = await db.method.findUnique({
      select: {
        comment: true,
        id: true,
        name: true,
        type: true,
      },
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return MethodTransformer.DMethodTransformer(rawData);
    }
  }

  public static async create(payload: RMethod): Promise<MMethod> {
    const rawData = await db.method.create({
      data: payload,
      select: {
        comment: true,
        id: true,
        name: true,
        type: true,
      },
    });

    return MethodTransformer.DMethodTransformer(rawData);
  }

  public static async delete(id: Id): Promise<MMethod> {
    const rawData = await db.method.delete({
      select: {
        comment: true,
        id: true,
        name: true,
        type: true,
      },
      where: { id },
    });

    return MethodTransformer.DMethodTransformer(rawData);
  }

  public static async update(payload: RMethod, id: MMethod['id']): Promise<MMethod> {
    const rawData = await db.method.update({
      data: payload,
      select: {
        comment: true,
        id: true,
        name: true,
        type: true,
      },
      where: { id },
    });

    return MethodTransformer.DMethodTransformer(rawData);
  }
}
