import { backendImplements } from '@/decorator';
import { db } from '@/lib/db';
import { MethodTransformer } from '@/transformer';
import { DMethod, Id, MMethod, NType, RMethod } from '@/types';

const queryObj = {
  comment: true,
  id: true,
  name: true,
  type: true,
};

@backendImplements()
export abstract class MethodRepository {
  public static async FindAll(): Promise<MMethod[]> {
    const rawData: DMethod[] = await db.method.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((category) => MethodTransformer.DMethodTransformer(category));

    return parsedData;
  }

  public static async Find(id: Id): Promise<NType<MMethod>> {
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

  public static async Create(payload: RMethod): Promise<MMethod> {
    const rawData = await db.method.create({
      data: payload,
      select: queryObj,
    });

    return MethodTransformer.DMethodTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<MMethod> {
    const rawData = await db.method.delete({
      select: queryObj,
      where: { id },
    });

    return MethodTransformer.DMethodTransformer(rawData);
  }

  public static async Update(payload: RMethod, id: MMethod['id']): Promise<MMethod> {
    const rawData = await db.method.update({
      data: payload,
      select: queryObj,
      where: { id },
    });

    return MethodTransformer.DMethodTransformer(rawData);
  }
}
