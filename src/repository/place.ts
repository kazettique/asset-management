import { db } from '@/lib/db';
import { PlaceTransformer } from '@/transformer';
import { DPlace, Id, MPlace, NType, RPlace } from '@/types';

export abstract class PlaceRepository {
  public static async getAllPlace(): Promise<MPlace[]> {
    const rawData: DPlace[] = await db.place.findMany({
      select: {
        comment: true,
        id: true,
        name: true,
      },
    });

    const parsedData = rawData.map((place) => PlaceTransformer.DPlaceTransformer(place));

    return parsedData;
  }

  public static async getPlace(id: Id): Promise<NType<MPlace>> {
    const rawData: NType<DPlace> = await db.place.findUnique({
      select: {
        comment: true,
        id: true,
        name: true,
      },
      where: { id },
    });

    if (rawData === null) {
      return rawData;
    } else {
      return PlaceTransformer.DPlaceTransformer(rawData);
    }
  }

  public static async createPlace(payload: RPlace): Promise<MPlace> {
    const rawData = await db.place.create({
      data: payload,
      select: {
        comment: true,
        id: true,
        name: true,
      },
    });

    return PlaceTransformer.DPlaceTransformer(rawData);
  }

  public static async deletePlace(id: Id): Promise<MPlace> {
    const rawData = await db.place.delete({
      select: {
        comment: true,
        id: true,
        name: true,
      },
      where: { id },
    });

    return PlaceTransformer.DPlaceTransformer(rawData);
  }

  public static async updatePlace(payload: RPlace, id: MPlace['id']): Promise<MPlace> {
    const rawData = await db.place.update({
      data: payload,
      select: {
        comment: true,
        id: true,
        name: true,
      },
      where: { id },
    });

    return PlaceTransformer.DPlaceTransformer(rawData);
  }
}
