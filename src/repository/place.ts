import { db } from '@/lib/db';
import { PlaceTransformer } from '@/transformer';
import { DPlace, Id, MPlace, NString, NType, PPlace } from '@/types';

const queryObj = {
  comment: true,
  id: true,
  name: true,
};

export abstract class PlaceRepository {
  public static async FindAll(): Promise<MPlace[]> {
    const rawData: DPlace[] = await db.place.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((place) => PlaceTransformer.DMPlaceTransformer(place));

    return parsedData;
  }

  public static async Find(id: Id): Promise<NType<MPlace>> {
    const rawData: NType<DPlace> = await db.place.findUnique({
      select: queryObj,
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return PlaceTransformer.DMPlaceTransformer(rawData);
    }
  }

  public static async Create(name: string, comment: NString): Promise<MPlace> {
    const rawData = await db.place.create({
      data: { comment, name },
      select: queryObj,
    });

    return PlaceTransformer.DMPlaceTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<MPlace> {
    const rawData = await db.place.delete({
      select: queryObj,
      where: { id },
    });

    return PlaceTransformer.DMPlaceTransformer(rawData);
  }

  public static async Update(id: MPlace['id'], name: string, comment: NString): Promise<MPlace> {
    const rawData = await db.place.update({
      data: { comment, name },
      select: queryObj,
      where: { id },
    });

    return PlaceTransformer.DMPlaceTransformer(rawData);
  }
}
