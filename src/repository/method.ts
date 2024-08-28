import { db } from '@/lib/db';
import { MethodTransformer } from '@/transformer';
import { DMethod, Id, MMethod, NType, RMethod } from '@/types';

const queryObj = {
  comment: true,
  id: true,
  name: true,
  type: true,
};

export abstract class MethodRepository {
  public static async getAll(): Promise<MMethod[]> {
    const rawData: DMethod[] = await db.method.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((category) => MethodTransformer.DMethodTransformer(category));

    return parsedData;
  }

  public static async get(id: Id): Promise<NType<MMethod>> {
    const rawData: NType<DMethod> = await db.method.findUnique({
      select: queryObj,
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
      select: queryObj,
    });

    return MethodTransformer.DMethodTransformer(rawData);
  }

  public static async delete(id: Id): Promise<MMethod> {
    const rawData = await db.method.delete({
      select: queryObj,
      where: { id },
    });

    return MethodTransformer.DMethodTransformer(rawData);
  }

  public static async update(payload: RMethod, id: MMethod['id']): Promise<MMethod> {
    const rawData = await db.method.update({
      data: payload,
      select: queryObj,
      where: { id },
    });

    return MethodTransformer.DMethodTransformer(rawData);
  }
}
