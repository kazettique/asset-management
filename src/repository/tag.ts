import { db } from '@/lib/db';
import { TagTransformer } from '@/transformer';
import { DTag, Id, MTag, NString, NType } from '@/types';

const queryObj = {
  comment: true,
  id: true,
  name: true,
};

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

  public static async Create(name: string, comment: NString): Promise<MTag> {
    const rawData = await db.tag.create({
      data: { comment, name },
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

  public static async Update(id: MTag['id'], name: string, comment: NString): Promise<MTag> {
    const rawData = await db.tag.update({
      data: { comment, name },
      select: queryObj,
      where: { id },
    });

    return TagTransformer.DMTagTransformer(rawData);
  }
}
