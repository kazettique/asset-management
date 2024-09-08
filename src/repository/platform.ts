import { backendImplements } from '@/decorator';
import { db } from '@/lib/db';
import { PlatformTransformer } from '@/transformer';
import { DPlatform, Id, MPlatform, NType, PPlatform } from '@/types';

const queryObj = {
  comment: true,
  id: true,
  name: true,
};

@backendImplements()
export abstract class PlatformRepository {
  public static async FindAll(): Promise<MPlatform[]> {
    const rawData: DPlatform[] = await db.platform.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((Platform) => PlatformTransformer.DMPlatformTransformer(Platform));

    return parsedData;
  }

  public static async Find(id: Id): Promise<NType<MPlatform>> {
    const rawData: NType<DPlatform> = await db.platform.findUnique({
      select: queryObj,
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return PlatformTransformer.DMPlatformTransformer(rawData);
    }
  }

  public static async Create(payload: PPlatform): Promise<MPlatform> {
    const rawData = await db.platform.create({
      data: payload,
      select: queryObj,
    });

    return PlatformTransformer.DMPlatformTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<MPlatform> {
    const rawData = await db.platform.delete({
      select: queryObj,
      where: { id },
    });

    return PlatformTransformer.DMPlatformTransformer(rawData);
  }

  public static async Update(payload: PPlatform, id: MPlatform['id']): Promise<MPlatform> {
    const rawData = await db.platform.update({
      data: payload,
      select: queryObj,
      where: { id },
    });

    return PlatformTransformer.DMPlatformTransformer(rawData);
  }
}
