import { FPlace, MPlace, VPlace, VPlaceTable } from '@/types';
import { DPlace } from '@/types/dbModels';

export abstract class PlaceTransformer {
  public static DMPlaceTransformer(src: DPlace): MPlace {
    return src;
  }

  public static MVPlaceTransformer(src: MPlace): VPlace {
    return src;
  }

  public static VTPlaceTransformer(src: VPlace): VPlaceTable {
    return {
      comment: src.comment ?? '',
      name: src.name,
      raw: src,
    };
  }

  public static VFPlaceTransformer(src: VPlace): FPlace {
    return {
      comment: src.comment,
      name: src.name,
    };
  }
}
