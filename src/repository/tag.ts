import { backendImplements } from '@/decorator';
import { db } from '@/lib/db';
import { TagTransformer } from '@/transformer';
import { DTag, Id, MTag, NType, PTag } from '@/types';

const queryObj = {
  comment: true,
  id: true,
  name: true,
};

@backendImplements()
export abstract class TagRepository {
  public static async FindAll(): Promise<MTag[]> {
    const rawData: DTag[] = await db.tag.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((place) => TagTransformer.DMTagTransformer(place));

    return parsedData;
  }

  public static async Find(id: Id): Promise<NType<MTag>> {
    const rawData: NType<DTag> = await db.tag.findUnique({
      select: queryObj,
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return TagTransformer.DMTagTransformer(rawData);
    }
  }

  public static async Create(payload: PTag): Promise<MTag> {
    const rawData = await db.tag.create({
      data: payload,
      select: queryObj,
    });

    return TagTransformer.DMTagTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<MTag> {
    const rawData = await db.tag.delete({
      select: queryObj,
      where: { id },
    });

    return TagTransformer.DMTagTransformer(rawData);
  }

  public static async Update(payload: PTag, id: MTag['id']): Promise<MTag> {
    const rawData = await db.tag.update({
      data: payload,
      select: queryObj,
      where: { id },
    });

    return TagTransformer.DMTagTransformer(rawData);
  }
}
