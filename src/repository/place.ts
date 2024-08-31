import { backendImplements } from '@/decorator';
import { db } from '@/lib/db';
import { PlaceTransformer } from '@/transformer';
import { DPlace, Id, MPlace, NType, RPlace } from '@/types';

const queryObj = {
  comment: true,
  id: true,
  name: true,
};

@backendImplements()
export abstract class PlaceRepository {
  public static async FindAll(): Promise<MPlace[]> {
    const rawData: DPlace[] = await db.place.findMany({
      select: queryObj,
    });

    const parsedData = rawData.map((place) => PlaceTransformer.DPlaceTransformer(place));

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
      return PlaceTransformer.DPlaceTransformer(rawData);
    }
  }

  public static async Create(payload: RPlace): Promise<MPlace> {
    const rawData = await db.place.create({
      data: payload,
      select: queryObj,
    });

    return PlaceTransformer.DPlaceTransformer(rawData);
  }

  public static async Delete(id: Id): Promise<MPlace> {
    const rawData = await db.place.delete({
      select: queryObj,
      where: { id },
    });

    return PlaceTransformer.DPlaceTransformer(rawData);
  }

  public static async Update(payload: RPlace, id: MPlace['id']): Promise<MPlace> {
    const rawData = await db.place.update({
      data: payload,
      select: queryObj,
      where: { id },
    });

    return PlaceTransformer.DPlaceTransformer(rawData);
  }
}
